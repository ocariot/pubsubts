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
import {
    IClientOptions,
    IConnection,
    IConnectionOptions,
    IConnectionParams,
    IMessage,
    IPubExchangeOptions,
    IServerOptions,
    IServerRegister,
    ISubExchangeOptions,
    pubSub
} from 'pubsub'
import { RoutingKeysName } from '../utils/routing.keys.name'
import { ExchangeName } from '../utils/exchange.name'
import { EventName } from '../utils/event.name'
import { Configurations } from '../utils/configurations'
import { EventEmitter } from 'events'
import { IConnectionConfigs } from '../port/connection/config.interface'
import { IOcariotPubSub } from '../port/ocariot.pub.sub.interface'
import { TargetMicroservice } from '../utils/queue.name'
import { ResourceName } from '../utils/resource.name'

const defaultOptionPub: IPubExchangeOptions = {
    exchange: {
        durable: true,
        type: 'direct'
    }
}
const defaultOptionSub: ISubExchangeOptions = {
    consumer: { noAck: true },
    exchange: {
        durable: true,
        type: 'direct'
    },
    queue: {
        durable: true
    },
    receiveFromYourself: true
}
const defaultOptionRpcClient: IClientOptions = {
    exchange: {
        durable: true,
        type: 'direct'
    },
    rcpTimeout: 5000
}
const defaultOptionRpcServer: IServerOptions = {
    consumer: { noAck: false },
    exchange: {
        durable: true,
        type: 'direct'
    },
    queue: {
        durable: true
    }
}
const defaultConnConfig: IConnectionParams = {
    protocol: 'amqp',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: 'ocariot'
}
const defaultConnOpt: IConnectionOptions = {
    retries: 0,
    interval: 1000
}

export class RabbitMQClient extends EventEmitter implements IOcariotPubSub {

    private readonly _connConfig: IConnectionParams | string
    private readonly _connOpt: IConnectionOptions

    private _pubConnection: IConnection
    private _pubConnectionInitialized: Promise<IConnection>
    private _subConnection: IConnection
    private _subConnectionInitialized: Promise<IConnection>
    private _serverConnection: IConnection
    private _serverConnectionInitialized: Promise<IConnection>
    private _clientConnection: IConnection
    private _clientConnectionInitialized: Promise<IConnection>

    constructor(private _appName: string, connParams?: IConnectionConfigs | string, connOptions?: IConnectionOptions) {
        super()

        this._connConfig = { ...defaultConnConfig } as IConnectionParams

        if (typeof connParams === 'object') {
            this._connConfig = { ...this._connConfig, ...connParams } as IConnectionParams
        }

        if (typeof connParams === 'string') {
            this._connConfig = connParams.concat('/').concat(Configurations.VHOST)
        }

        this._connOpt = { ...defaultConnOpt, ...connOptions } as IConnectionOptions

    }

    private pubEventInitialization(): void {

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
            pubSub.logger(level)
        }

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

        return new Promise<void>(async (resolve, reject) => {
            if (!this._pubConnection && !this._pubConnectionInitialized) {
                this._pubConnectionInitialized = pubSub.createConnetion(this._connConfig, this._connOpt)

                try {
                    this._pubConnection = await this._pubConnectionInitialized
                    this.pubEventInitialization()
                    this.emit('pub_connected')
                } catch (err) {
                    this._pubConnection = undefined
                    this._pubConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._pubConnectionInitialized
            } catch (err) {
                return reject(err)
            }

            const message: IMessage = {
                content: body
            }

            return this._pubConnection.pub(exchangeName, routingKey, message, defaultOptionPub)
        })
    }

    public sub(targetMicroservice: string, exchangeName: string, routingKey: string,
               callback: (message: any) => void): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            if (!this._subConnection && !this._subConnectionInitialized) {
                this._subConnectionInitialized = pubSub.createConnetion(this._connConfig, this._connOpt)

                try {
                    this._subConnection = await this._subConnectionInitialized
                    this.subEventInitialization()
                    this.emit('sub_connected')
                } catch (err) {
                    this._subConnection = undefined
                    this._subConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._subConnectionInitialized
            } catch (err) {
                return reject(err)
            }

            return this._subConnection.sub(this._appName.concat(targetMicroservice),
                exchangeName,
                routingKey,
                callback,
                defaultOptionSub)
        })
    }

    public resource(sourceMicroservice: string, exchangeName: string, name: string, func: (...any) => any[]): void {
        new Promise<void>(async (resolve, reject) => {
            if (!this._serverConnectionInitialized) {
                this._serverConnectionInitialized = pubSub.createConnetion(this._connConfig, this._connOpt)
                try {
                    this._serverConnection = await this._serverConnectionInitialized
                    this.serverEventInitialization()
                    this.emit('rpc_server_connected')
                } catch (err) {
                    this._serverConnection = undefined
                    this._serverConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._serverConnectionInitialized
            } catch (err) {
                return reject(err)
            }

            const server: IServerRegister = this._serverConnection
                .createRpcServer(this._appName.concat(sourceMicroservice), exchangeName, [], defaultOptionRpcServer)

            console.log(exchangeName, name)

            if (server.addResource(name, func)) return await server.start()

        }).catch(err => {
            throw err
        })
    }

    public getResource(exchangeName: string, name: string, params: any[], callback: (...any) => any): void

    public getResource(exchangeName: string, name: string, params: any[]): Promise<any>

    public getResource(exchangeName: string, name: string, params: any[], callback?: (err, result) => any): void | Promise<any> {

        if (!callback) {
            return this.getResourcePromise(exchangeName, name, params)
        }
        this.getResourceCallback(exchangeName, name, params, callback)
    }

    public getResourceCallback(exchangeName: string, name: string, params: any[], callback: (...any) => any): void {
        new Promise<void>(async (resolve, reject) => {
            if (!this._clientConnectionInitialized) {
                this._clientConnectionInitialized = pubSub.createConnetion(this._connConfig, this._connOpt)

                try {
                    this._clientConnection = await this._clientConnectionInitialized
                    this.clientEventInitialization()
                    this.emit('rpc_client_connected')
                } catch (err) {
                    this._clientConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._clientConnectionInitialized
            } catch (err) {
                return reject(err)
            }

            this._clientConnection.rpcClient(exchangeName, name, params, callback, defaultOptionRpcClient)
        }).catch(err => {
            throw err
        })
    }

    public async getResourcePromise(exchangeName: string, name: string, params: any[]): Promise<any> {

        return new Promise<void>(async (resolve, reject) => {
            if (!this._clientConnectionInitialized) {
                this._clientConnectionInitialized = pubSub.createConnetion(this._connConfig, this._connOpt)

                try {
                    this._clientConnection = await this._clientConnectionInitialized
                    this.clientEventInitialization()
                    this.emit('rpc_client_connected')
                } catch (err) {
                    this._clientConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._clientConnectionInitialized
            } catch (err) {
                return reject(err)
            }

            return this._clientConnection.rpcClient(exchangeName, name, params, defaultOptionRpcClient)
        })
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

    public subSavePhysicalActivity(callback: (message: any) => void): Promise<void> {

        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, callback)

    }

    public subUpdatePhysicalActivity(callback: (message: any) => void): Promise<void> {

        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, callback)

    }

    public subDeletePhysicalActivity(callback: (message: any) => void): Promise<void> {

        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, callback)

    }

    public subSaveSleep(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, callback)
    }

    public subUpdateSleep(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, callback)
    }

    public subDeleteSleep(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP, callback)
    }

    public subSaveWeight(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.WEIGHTS, RoutingKeysName.SAVE_WEIGHTS, callback)
    }

    public subDeleteWeight(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.WEIGHTS, RoutingKeysName.DELETE_WEIGHTS, callback)
    }

    public subSaveBodyFat(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.BODY_FATS, RoutingKeysName.SAVE_BODY_FATS, callback)
    }

    public subDeleteBodyFat(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.BODY_FATS, RoutingKeysName.DELETE_BODY_FATS, callback)
    }

    public subSaveEnvironment(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, callback)
    }

    public subDeleteEnvironment(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, callback)
    }

    public subUpdateChild(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, callback)
    }

    public subUpdateFamily(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, callback)
    }

    public subUpdateEducator(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, callback)
    }

    public subUpdateHealthProfessional(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, callback)
    }

    public subUpdateApplication(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS, callback)
    }

    public subDeleteUser(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.USERS, RoutingKeysName.DELETE_USERS, callback)
    }

    public subDeleteInstitution(callback: (message: any) => void): Promise<void> {
        return this.sub(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, callback)
    }

    public resourcePhysicalActivities(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, ResourceName.PHYSICAL_ACTIVITIES, listener)
    }

    public resourcePhysicalActivitiesLogs(listener: (resource: string, date_start: string, date_end: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, ResourceName.PHYSICAL_ACTIVITIES_LOGS, listener)
    }

    public resourceSleep(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, ResourceName.SLEEP, listener)
    }

    public resourceWights(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.WEIGHTS, ResourceName.WEIGHTS, listener)
    }

    public resourceBodyFats(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.BODY_FATS, ResourceName.BODY_FATS, listener)
    }

    public resourceEnviroments(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.ENVIRONMENTS, ResourceName.ENVIROMENTS, listener)
    }

    public resourceChildren(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.CHILDREN, ResourceName.CHILDREN, listener)
    }

    public resourceFamilies(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.FAMILIES, ResourceName.FAMILIES, listener)
    }

    public resourceFamilyChildren(listener: (family_id: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.FAMILIES, ResourceName.FAMILY_CHILDREN, listener)
    }

    public resourceEducators(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.EDUCATORS, ResourceName.EDUCATORS, listener)
    }

    public resourceEducatorChildrenGroups(listener: (educator_id: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.EDUCATORS, ResourceName.EDUCATORS_CILDRES_GROUPS, listener)
    }

    public resourceHealthProfessionals(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.HEALTH_PROFESSIONALS, ResourceName.HEALTH_PROFESSIONALS, listener)
    }

    public resourceHealthProfessionalChildrenGroups(listener: (healthprofessional_id: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.HEALTH_PROFESSIONALS, ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, listener)
    }

    public resourceApplications(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.APPLICATIONS, ResourceName.APPLICATIONS, listener)
    }

    public resourceInstitutions(listener: (query: string) => any): any {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.INSTITUTIONS, ResourceName.INSTITUTIONS, listener)
    }

    public getPhysicalActivities(query: string, callback: (err, result) => any): void

    public getPhysicalActivities(query: string): Promise<any>

    public getPhysicalActivities(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.PHYSICAL_ACTIVITIES, ResourceName.PHYSICAL_ACTIVITIES, [query])
        }
        this.getResource(ExchangeName.PHYSICAL_ACTIVITIES, ResourceName.PHYSICAL_ACTIVITIES, [query], callback)
    }

    public getPhysicalActivitiesLogs(resource: string, date_start: number,
                                     date_end: number, callback: (err, result) => any): void

    public getPhysicalActivitiesLogs(resource: string, date_start: number,
                                     date_end: number): Promise<any>

    public getPhysicalActivitiesLogs(resource: string, date_start: number,
                                     date_end: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.PHYSICAL_ACTIVITIES, ResourceName.PHYSICAL_ACTIVITIES_LOGS,
                [resource, date_start, date_end])
        }
        this.getResource(ExchangeName.PHYSICAL_ACTIVITIES, ResourceName.PHYSICAL_ACTIVITIES_LOGS,
            [resource, date_start, date_end], callback)
    }

    public getSleep(query: string, callback: (err, result) => any): void

    public getSleep(query: string): Promise<any>

    public getSleep(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.SLEEP, ResourceName.SLEEP, [query])
        }
        this.getResource(ExchangeName.SLEEP, ResourceName.SLEEP, [query], callback)
    }

    public getWeights(query: string, callback: (err, result) => any): void

    public getWeights(query: string): Promise<any>

    public getWeights(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.WEIGHTS, ResourceName.WEIGHTS, [query])
        }
        this.getResource(ExchangeName.WEIGHTS, ResourceName.WEIGHTS, [query], callback)
    }

    public getBodyFats(query: string, callback: (err, result) => any): void

    public getBodyFats(query: string): Promise<any>

    public getBodyFats(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.BODY_FATS, ResourceName.BODY_FATS, [query])
        }
        this.getResource(ExchangeName.BODY_FATS, ResourceName.BODY_FATS, [query], callback)
    }

    public getEnviroments(query: string, callback: (err, result) => any): void

    public getEnviroments(query: string): Promise<any>

    public getEnviroments(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.ENVIRONMENTS, ResourceName.ENVIROMENTS, [query])
        }
        this.getResource(ExchangeName.ENVIRONMENTS, ResourceName.ENVIROMENTS, [query], callback)
    }

    public getChildren(query: string, callback: (err, result) => any): void

    public getChildren(query: string): Promise<any>

    public getChildren(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.CHILDREN, ResourceName.CHILDREN, [query])
        }
        this.getResource(ExchangeName.CHILDREN, ResourceName.CHILDREN, [query], callback)
    }

    public getFamilies(query: string, callback: (err, result) => any): void

    public getFamilies(query: string): Promise<any>

    public getFamilies(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.FAMILIES, ResourceName.FAMILIES, [query])
        }
        this.getResource(ExchangeName.FAMILIES, ResourceName.FAMILIES, [query], callback)
    }

    public getFamilyChildren(family_id: number, callback: (err, result) => any): void

    public getFamilyChildren(family_id: number): Promise<any>

    public getFamilyChildren(family_id: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.FAMILIES, ResourceName.FAMILY_CHILDREN, [family_id])
        }
        this.getResource(ExchangeName.FAMILIES, ResourceName.FAMILY_CHILDREN, [family_id], callback)
    }

    public getEducators(query: string, callback: (err, result) => any): void

    public getEducators(query: string): Promise<any>

    public getEducators(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.EDUCATORS, ResourceName.EDUCATORS, [query])
        }
        this.getResource(ExchangeName.EDUCATORS, ResourceName.EDUCATORS, [query], callback)
    }

    public getEducatorChildrenGroups(educator_id: number, callback: (err, result) => any): void

    public getEducatorChildrenGroups(educator_id: number): Promise<any>

    public getEducatorChildrenGroups(educator_id: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.EDUCATORS, ResourceName.EDUCATORS_CILDRES_GROUPS, [educator_id])
        }
        this.getResource(ExchangeName.EDUCATORS, ResourceName.EDUCATORS_CILDRES_GROUPS, [educator_id], callback)
    }

    public getHealthProfessionals(query: string, callback: (err, result) => any): void

    public getHealthProfessionals(query: string): Promise<any>

    public getHealthProfessionals(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.HEALTH_PROFESSIONALS, ResourceName.HEALTH_PROFESSIONALS, [query])
        }
        this.getResource(ExchangeName.HEALTH_PROFESSIONALS, ResourceName.HEALTH_PROFESSIONALS, [query], callback)
    }

    public getHealthProfessionalChildrenGroups(healthprofessional_id: number, callback: (err, result) => any): void

    public getHealthProfessionalChildrenGroups(healthprofessional_id: number): Promise<any>

    public getHealthProfessionalChildrenGroups(healthprofessional_id: number, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.HEALTH_PROFESSIONALS, ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS,
                [healthprofessional_id])
        }
        this.getResource(ExchangeName.HEALTH_PROFESSIONALS,
            ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, [healthprofessional_id], callback)
    }

    public getApplications(query: string, callback: (err, result) => any): void

    public getApplications(query: string): Promise<any>

    public getApplications(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.APPLICATIONS, ResourceName.APPLICATIONS, [query])
        }
        this.getResource(ExchangeName.APPLICATIONS, ResourceName.APPLICATIONS, [query], callback)
    }

    public getInstitutions(query: string, callback: (err, result) => any): void

    public getInstitutions(query: string): Promise<any>

    public getInstitutions(query: string, callback?: (err, result) => any): any {

        if (!callback) {
            return this.getResource(ExchangeName.INSTITUTIONS, ResourceName.INSTITUTIONS, [query])
        }
        this.getResource(ExchangeName.INSTITUTIONS, ResourceName.INSTITUTIONS, [query], callback)
    }

}
