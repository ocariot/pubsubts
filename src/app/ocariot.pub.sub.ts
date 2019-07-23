import {
    IMessageApplication,
    IMessageBodyFat,
    IMessageChild,
    IMessageEducator,
    IMessageEnvironment,
    IMessageFamily,
    IMessageHealthProfessional,
    IMessageInstitution,
    IMessagePhysicalActivity,
    IMessageSleep,
    IMessageUser,
    IMessageWeigth
} from '../port/pub/message.interface'
import { IConnConfiguration, IConnOptions, PubSub } from 'pubsub'
import { RoutingKeysName } from '../utils/routing.keys.name'
import { ExchangeName } from '../utils/exchange.name'
import { EventName } from '../utils/event.name'
import { Configurations } from '../utils/configurations'
import { EventEmitter } from 'events'
import { IConnConfig } from '../port/connection/config.interface'
import { IOcariotPubSub } from '../port/ocariot.pub.sub.interface'
import { IConnOpt } from '../port/connection/opt.interface'
import { TargetMicroservice } from '../utils/queue.name'
import { ResourceName } from '../utils/resource.name'
import { defaultConnConfig, defaultConnOpt } from '../port/connection/parameters.default'

export class OcariotPubSub extends EventEmitter implements IOcariotPubSub {

    private readonly _connConfig: IConnConfiguration | string
    private readonly _connOpt: IConnOptions

    private _pubConnection: PubSub
    private _subConnection: PubSub
    private _serverConnection: PubSub
    private _clientConnection: PubSub

    constructor(private _appName: string, connParams?: IConnConfig | string, connOptions?: IConnOpt) {
        super()

        this._connConfig = { ...defaultConnConfig } as IConnConfiguration

        if (typeof connParams === 'object') {
            this._connConfig = { ...this._connConfig, ...connParams } as IConnConfiguration
        }

        if (typeof connParams === 'string') {
            this._connConfig = connParams.concat('/').concat(Configurations.VHOST)
        }

        this._connOpt = { ...defaultConnOpt, ...connOptions } as IConnOptions

        this._pubConnection = new PubSub()
        this._subConnection = new PubSub()
        this._clientConnection = new PubSub()
        this._serverConnection = new PubSub()

        this._pubConnection.serviceTag(this._appName)
        this._subConnection.serviceTag(this._appName)

    }

    private pubEventInitialization(): void {

        this._pubConnection.on('open_connection', () => {
            this.emit('pub_connected')
        })
        this._pubConnection.on('close_connection', () => {
            this.emit('pub_disconnected')
        })
        this._pubConnection.on('re_established_connection', () => {
            this.emit('pub_reconnected')
        })
        this._pubConnection.on('trying_connect', () => {
            this.emit('pub_trying_connection')
        })
        this._pubConnection.on('lost_connection', () => {
            this.emit('pub_lost_connection')
        })
        this._pubConnection.on('error_connection', (err) => {
            this.emit('pub_connection_error', err)
        })

    }

    private subEventInitialization(): void {

        this._subConnection.on('open_connection', () => {
            this.emit('sub_connected')
        })
        this._subConnection.on('close_connection', () => {
            this.emit('sub_disconnected')
        })
        this._subConnection.on('re_established_connection', () => {
            this.emit('sub_reconnected')
        })
        this._subConnection.on('trying_connect', () => {
            this.emit('sub_trying_connection')
        })
        this._subConnection.on('lost_connection', () => {
            this.emit('sub_lost_connection')
        })
        this._subConnection.on('error_connection', (err) => {
            this.emit('sub_connection_error', err)
        })

    }

    private serverEventInitialization(): void {

        this._serverConnection.on('open_connection', () => {
            this.emit('rpc_server_connected')
        })
        this._serverConnection.on('close_connection', () => {
            this.emit('rpc_server_disconnected')
        })
        this._serverConnection.on('re_established_connection', () => {
            this.emit('rpc_server_reconnected')
        })
        this._serverConnection.on('trying_connect', () => {
            this.emit('rpc_server_trying_connection')
        })
        this._serverConnection.on('lost_connection', () => {
            this.emit('rpc_server_lost_connection')
        })
        this._serverConnection.on('error_connection', (err) => {
            this.emit('rpc_server_connection_error', err)
        })
    }

    private clientEventInitialization(): void {

        this._clientConnection.on('open_connection', () => {
            this.emit('rpc_client_connected')
        })
        this._clientConnection.on('close_connection', () => {
            this.emit('rpc_client_disconnected')
        })
        this._clientConnection.on('re_established_connection', () => {
            this.emit('rpc_client_reconnected')
        })
        this._clientConnection.on('trying_connect', () => {
            this.emit('rpc_client_trying_connection')
        })
        this._clientConnection.on('lost_connection', () => {
            this.emit('rpc_client_lost_connection')
        })
        this._clientConnection.on('error_connection', (err) => {
            this.emit('rpc_client_connection_error', err)
        })

    }

    public logger(enabled: boolean, level?: string): void {

        if (level === 'warn' || level === 'error' || level === 'info' || !level) {
            this._pubConnection.logger(enabled, level)
            this._subConnection.logger(enabled, level)
            this._clientConnection.logger(enabled, level)
            this._serverConnection.logger(enabled, level)

        }

    }

    public receiveFromYourself(value: boolean): void {
        this._subConnection.topic.options = {receiveFromYourself: value}
    }

    public async close(): Promise<void> {
        try {
            await this._pubConnection.close()
            await this._subConnection.close()
            await this._clientConnection.close()
            await this._serverConnection.close()
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public async dispose(): Promise<void> {
        try {
            await this._pubConnection.dispose()
            await this._subConnection.dispose()
            await this._clientConnection.dispose()
            await this._serverConnection.dispose()
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public async pub(exchangeName: string, routingKey: string, body: any): Promise<void> {

        this.pubEventInitialization()

        this._pubConnection.connect(this._connConfig, this._connOpt)

        await this._pubConnection.initializedConnection.catch((err) => {
            return Promise.reject(err)
        })

        const topic = this._pubConnection.topic

        return topic.pub(exchangeName, routingKey, body)
    }

    public sub(targetMicroservice: string, exchangeName: string, routingKey: string,
               callback: (err, message: any) => void): void {

        this.subEventInitialization()

        this._subConnection.connect(this._connConfig, this._connOpt)

        this._subConnection.initializedConnection.then(() => {

            const topic = this._subConnection.topic

            topic.sub(exchangeName, this._appName.concat(targetMicroservice), routingKey, callback)
        }).catch((err) => {
            return callback(err, undefined)
        })

    }

    public resource(sourceMicroservice: string, name: string, exchangeName: string, func: (...any) => any[]): void {

        this.serverEventInitialization()

        this._serverConnection.connect(this._connConfig, this._connOpt)

        this._serverConnection.initializedConnection.then(() => {

            const topic = this._serverConnection.topic

            topic.rpcServer(this._appName.concat(sourceMicroservice), exchangeName, name).then((server) => {
                server.addResource(name, func)
            }).catch((err) => {
                throw err
            })
        }).catch((err) => {
            throw err
        })

    }

    public getResource(name: string, exchangeName: string, params: any[], callback: (...any) => any): void

    public getResource(name: string, exchangeName: string, params: any[]): Promise<any>

    public getResource(name: string, exchangeName: string, params: any[], callback?: (err, result) => any): void | Promise<any> {

        if (!callback) {
            return this.getResourcePromise(name, exchangeName, params)
        }
        this.getResourceCallback(name, exchangeName, params, callback)
    }

    public getResourceCallback(name: string, exchangeName: string, params: any[], callback: (...any) => any): void {

        this.clientEventInitialization()

        this._clientConnection.connect(this._connConfig, this._connOpt)

        this._clientConnection.initializedConnection.then(() => {
            const topic = this._clientConnection.topic

            topic.rpcClient(exchangeName, name, params, callback)
        }).catch((err) => {
            callback(err, undefined)
        })

    }

    public async getResourcePromise(name: string, exchangeName: string, params: any[]): Promise<any> {

        this.clientEventInitialization()

        this._clientConnection.connect(this._connConfig, this._connOpt)

        await this._clientConnection.initializedConnection.catch((err) => {
            return Promise.reject(err)
        })

        const topic = this._clientConnection.topic

        return topic.rpcClient(exchangeName, name, params)

    }

    public pubSavePhysicalActivity(activity: any): Promise<void> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.SAVE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, message)
    }

    public pubUpdatePhysicalActivity(activity: any): Promise<void> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.UPDATE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, message)
    }

    public pubDeletePhysicalActivity(activity: any): Promise<void> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.DELETE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, message)
    }

    public pubSaveSleep(sleep: any): Promise<void> {
        const message: IMessageSleep = {
            event_name: EventName.SAVE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, message)
    }

    public pubUpdateSleep(sleep: any): Promise<void> {
        const message: IMessageSleep = {
            event_name: EventName.UPDATE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, message)
    }

    public pubDeleteSleep(sleep: any): Promise<void> {
        const message: IMessageSleep = {
            event_name: EventName.DELETE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP,
            message)
    }

    public pubSaveWeight(weight: any): Promise<void> {
        const message: IMessageWeigth = {
            event_name: EventName.SAVE_WEIGHT_EVENT,
            timestamp: new Date().toISOString(),
            weight
        }

        return this.pub(ExchangeName.WEIGHTS, RoutingKeysName.SAVE_WEIGHTS, message)
    }

    public pubDeleteWeight(weight: any): Promise<void> {
        const message: IMessageWeigth = {
            event_name: EventName.DELETE_WEIGHT_EVENT,
            timestamp: new Date().toISOString(),
            weight
        }

        return this.pub(ExchangeName.WEIGHTS, RoutingKeysName.DELETE_WEIGHTS, message)
    }

    public pubSaveBodyFat(bodyfat: any): Promise<void> {
        const message: IMessageBodyFat = {
            event_name: EventName.SAVE_BODY_FAT_EVENT,
            timestamp: new Date().toISOString(),
            bodyfat
        }

        return this.pub(ExchangeName.BODY_FATS, RoutingKeysName.SAVE_BODY_FATS, message)
    }

    public pubDeleteBodyFat(bodyfat: any): Promise<void> {
        const message: IMessageBodyFat = {
            event_name: EventName.DELETE_BODY_FAT_EVENT,
            timestamp: new Date().toISOString(),
            bodyfat
        }

        return this.pub(ExchangeName.BODY_FATS, RoutingKeysName.DELETE_BODY_FATS, message)
    }

    public pubSaveEnvironment(environment: any): Promise<void> {
        const message: IMessageEnvironment = {
            event_name: EventName.SAVE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        }

        return this.pub(ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, message)
    }

    public pubDeleteEnvironment(environment: any): Promise<void> {
        const message: IMessageEnvironment = {
            event_name: EventName.DELETE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        }

        return this.pub(ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, message)
    }

    public pubUpdateChild(child: any): Promise<void> {
        const message: IMessageChild = {
            event_name: EventName.UPDATE_CHILD_EVENT,
            timestamp: new Date().toISOString(),
            child
        }

        return this.pub(ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, message)
    }

    public pubUpdateFamily(family: any): Promise<void> {
        const message: IMessageFamily = {
            event_name: EventName.UPDATE_FAMILY_EVENT,
            timestamp: new Date().toISOString(),
            family
        }

        return this.pub(ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, message)
    }

    public pubUpdateEducator(educator: any): Promise<void> {
        const message: IMessageEducator = {
            event_name: EventName.UPDATE_EDUCATOR_EVENT,
            timestamp: new Date().toISOString(),
            educator
        }

        return this.pub(ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, message)
    }

    public pubUpdateHealthProfessional(healthprofessional: any): Promise<void> {
        const message: IMessageHealthProfessional = {
            event_name: EventName.UPDATE_HEALTH_PROFESSIONAL_EVENT,
            timestamp: new Date().toISOString(),
            healthprofessional
        }

        return this.pub(ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, message)
    }

    public pubUpdateApplication(application: any): Promise<void> {
        const message: IMessageApplication = {
            event_name: EventName.UPDATE_APPLICATION_EVENT,
            timestamp: new Date().toISOString(),
            application
        }

        return this.pub(ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS,
            message)
    }

    public pubDeleteUser(user: any): Promise<void> {
        const message: IMessageUser = {
            event_name: EventName.DELETE_USER_EVENT,
            timestamp: new Date().toISOString(),
            user
        }

        return this.pub(ExchangeName.USERS, RoutingKeysName.DELETE_USERS, message)
    }

    public pubDeleteInstitution(institution: any): Promise<void> {
        const message: IMessageInstitution = {
            event_name: EventName.DELETE_INSTITUTION_EVENT,
            timestamp: new Date().toISOString(),
            institution
        }

        return this.pub(ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, message)

    }

    public subSavePhysicalActivity(callback: (err, message: any) => void): void {

        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, callback)

    }

    public subUpdatePhysicalActivity(callback: (err, message: any) => void): void {

        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, callback)

    }

    public subDeletePhysicalActivity(callback: (err, message: any) => void): void {

        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, callback)

    }

    public subSaveSleep(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, callback)
    }

    public subUpdateSleep(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, callback)
    }

    public subDeleteSleep(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP, callback)
    }

    public subSaveWeight(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.WEIGHTS, RoutingKeysName.SAVE_WEIGHTS, callback)
    }

    public subDeleteWeight(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.WEIGHTS, RoutingKeysName.DELETE_WEIGHTS, callback)
    }

    public subSaveBodyFat(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.BODY_FATS, RoutingKeysName.SAVE_BODY_FATS, callback)
    }

    public subDeleteBodyFat(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.BODY_FATS, RoutingKeysName.DELETE_BODY_FATS, callback)
    }

    public subSaveEnvironment(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, callback)
    }

    public subDeleteEnvironment(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, callback)
    }

    public subUpdateChild(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, callback)
    }

    public subUpdateFamily(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, callback)
    }

    public subUpdateEducator(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, callback)
    }

    public subUpdateHealthProfessional(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, callback)
    }

    public subUpdateApplication(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS, callback)
    }

    public subDeleteUser(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.USERS, RoutingKeysName.DELETE_USERS, callback)
    }

    public subDeleteInstitution(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, callback)
    }

    public resourcePhysicalActivities(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ResourceName.PHYSICAL_ACTIVITIES, ExchangeName.PHYSICAL_ACTIVITIES, listener)
    }

    public resourcePhysicalActivitiesLogs(listener: (resource: string, date_start: string, date_end: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ResourceName.PHYSICAL_ACTIVITIES_LOGS, ExchangeName.PHYSICAL_ACTIVITIES, listener)
    }

    public resourceSleep(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ResourceName.SLEEP, ExchangeName.SLEEP, listener)
    }

    public resourceWights(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ResourceName.WEIGHTS, ExchangeName.WEIGHTS, listener)
    }

    public resourceBodyFats(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ResourceName.BODY_FATS, ExchangeName.BODY_FATS, listener)
    }

    public resourceEnviroments(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ResourceName.ENVIROMENTS, ExchangeName.ENVIRONMENTS, listener)
    }

    public resourceChildren(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.CHILDREN, ExchangeName.CHILDREN, listener)
    }

    public resourceFamilies(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.FAMILIES, ExchangeName.FAMILIES, listener)
    }

    public resourceFamilyChildren(listener: (family_id: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.FAMILY_CHILDREN, ExchangeName.FAMILIES, listener)
    }

    public resourceEducators(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.EDUCATORS, ExchangeName.EDUCATORS, listener)
    }

    public resourceEducatorChildrenGroups(listener: (educator_id: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.EDUCATORS_CILDRES_GROUPS, ExchangeName.EDUCATORS, listener)
    }

    public resourceHealthProfessionals(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.HEALTH_PROFESSIONALS, ExchangeName.HEALTH_PROFESSIONALS, listener)
    }

    public resourceHealthProfessionalChildrenGroups(listener: (healthprofessional_id: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, ExchangeName.HEALTH_PROFESSIONALS, listener)
    }

    public resourceApplications(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.APPLICATIONS, ExchangeName.APPLICATIONS, listener)
    }

    public resourceInstitutions(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ResourceName.INSTITUTIONS, ExchangeName.INSTITUTIONS, listener)
    }

    public getPhysicalActivities(query: string, callback: (err, result) => any): void

    public getPhysicalActivities(query: string): Promise<any>

    public getPhysicalActivities(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.PHYSICAL_ACTIVITIES, ExchangeName.PHYSICAL_ACTIVITIES, [query])
        }
        this.getResource(ResourceName.PHYSICAL_ACTIVITIES, ExchangeName.PHYSICAL_ACTIVITIES, [query], callback)
    }

    public getPhysicalActivitiesLogs(resource: string, date_start: number,
                                     date_end: number, callback: (err, result) => any): void

    public getPhysicalActivitiesLogs(resource: string, date_start: number,
                                     date_end: number): Promise<any>

    public getPhysicalActivitiesLogs(resource: string, date_start: number,
                                     date_end: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.PHYSICAL_ACTIVITIES_LOGS, ExchangeName.PHYSICAL_ACTIVITIES,
                [resource, date_start, date_end])
        }
        this.getResource(ResourceName.PHYSICAL_ACTIVITIES_LOGS, ExchangeName.PHYSICAL_ACTIVITIES,
            [resource, date_start, date_end], callback)
    }

    public getSleep(query: string, callback: (err, result) => any): void

    public getSleep(query: string): Promise<any>

    public getSleep(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.SLEEP, ExchangeName.SLEEP, [query])
        }
        this.getResource(ResourceName.SLEEP, ExchangeName.SLEEP, [query], callback)
    }

    public getWeights(query: string, callback: (err, result) => any): void

    public getWeights(query: string): Promise<any>

    public getWeights(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.WEIGHTS, ExchangeName.WEIGHTS, [query])
        }
        this.getResource(ResourceName.WEIGHTS, ExchangeName.WEIGHTS, [query], callback)
    }

    public getBodyFats(query: string, callback: (err, result) => any): void

    public getBodyFats(query: string): Promise<any>

    public getBodyFats(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.BODY_FATS, ExchangeName.BODY_FATS, [query])
        }
        this.getResource(ResourceName.BODY_FATS, ExchangeName.BODY_FATS, [query], callback)
    }

    public getEnviroments(query: string, callback: (err, result) => any): void

    public getEnviroments(query: string): Promise<any>

    public getEnviroments(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.ENVIROMENTS, ExchangeName.ENVIRONMENTS, [query])
        }
        this.getResource(ResourceName.ENVIROMENTS, ExchangeName.ENVIRONMENTS, [query], callback)
    }

    public getChildren(query: string, callback: (err, result) => any): void

    public getChildren(query: string): Promise<any>

    public getChildren(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.CHILDREN, ExchangeName.CHILDREN, [query])
        }
        this.getResource(ResourceName.CHILDREN, ExchangeName.CHILDREN, [query], callback)
    }

    public getFamilies(query: string, callback: (err, result) => any): void

    public getFamilies(query: string): Promise<any>

    public getFamilies(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.FAMILIES, ExchangeName.FAMILIES, [query])
        }
        this.getResource(ResourceName.FAMILIES, ExchangeName.FAMILIES, [query], callback)
    }

    public getFamilyChildren(family_id: number, callback: (err, result) => any): void

    public getFamilyChildren(family_id: number): Promise<any>

    public getFamilyChildren(family_id: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.FAMILY_CHILDREN, ExchangeName.FAMILIES, [family_id])
        }
        this.getResource(ResourceName.FAMILY_CHILDREN, ExchangeName.FAMILIES, [family_id], callback)
    }

    public getEducators(query: string, callback: (err, result) => any): void

    public getEducators(query: string): Promise<any>

    public getEducators(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.EDUCATORS, ExchangeName.EDUCATORS, [query])
        }
        this.getResource(ResourceName.EDUCATORS, ExchangeName.EDUCATORS, [query], callback)
    }

    public getEducatorChildrenGroups(educator_id: number, callback: (err, result) => any): void

    public getEducatorChildrenGroups(educator_id: number): Promise<any>

    public getEducatorChildrenGroups(educator_id: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.EDUCATORS_CILDRES_GROUPS, ExchangeName.EDUCATORS, [educator_id])
        }
        this.getResource(ResourceName.EDUCATORS_CILDRES_GROUPS, ExchangeName.EDUCATORS, [educator_id], callback)
    }

    public getHealthProfessionals(query: string, callback: (err, result) => any): void

    public getHealthProfessionals(query: string): Promise<any>

    public getHealthProfessionals(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.HEALTH_PROFESSIONALS, ExchangeName.HEALTH_PROFESSIONALS, [query])
        }
        this.getResource(ResourceName.HEALTH_PROFESSIONALS, ExchangeName.HEALTH_PROFESSIONALS, [query], callback)
    }

    public getHealthProfessionalChildrenGroups(healthprofessional_id: number, callback: (err, result) => any): void

    public getHealthProfessionalChildrenGroups(healthprofessional_id: number): Promise<any>

    public getHealthProfessionalChildrenGroups(healthprofessional_id: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS,
                ExchangeName.HEALTH_PROFESSIONALS, [healthprofessional_id])
        }
        this.getResource(ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS,
            ExchangeName.HEALTH_PROFESSIONALS, [healthprofessional_id], callback)
    }

    public getApplications(query: string, callback: (err, result) => any): void

    public getApplications(query: string): Promise<any>

    public getApplications(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.APPLICATIONS, ExchangeName.APPLICATIONS, [query])
        }
        this.getResource(ResourceName.APPLICATIONS, ExchangeName.APPLICATIONS, [query], callback)
    }

    public getInstitutions(query: string, callback: (err, result) => any): void

    public getInstitutions(query: string): Promise<any>

    public getInstitutions(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ResourceName.INSTITUTIONS, ExchangeName.INSTITUTIONS, [query])
        }
        this.getResource(ResourceName.INSTITUTIONS, ExchangeName.INSTITUTIONS, [query], callback)
    }

}
