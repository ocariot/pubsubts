import {
    IMessageApplication,
    IMessageChild,
    IMessageEducator,
    IMessageEnvironment,
    IMessageFamily,
    IMessageHealthProfessional,
    IMessageInstitution,
    IMessagePhysicalActivity,
    IMessageSleep,
    IMessageUser
} from '../port/pub/message.interface'
import { IConnConfiguration, IConnOptions, PubSub } from 'pubsub'
import { RoutingKeysName } from '../utils/routing.keys.name'
import { ExchangeName } from '../utils/exchange.name'
import { EventName } from '../utils/event.name'
import { Configurations } from '../utils/configurations'
import { EventEmitter } from 'events'
import { defaultConnConfig, IConnConfig } from '../port/connection/config.interface'
import { IOcariotPubSub } from '../port/ocariot.pub.sub.interface'
import { defaultConnOpt, IConnOpt } from '../port/connection/opt.interface'
import { TargetMicroservice } from '../utils/queue.name'

export class OcariotPubSub extends EventEmitter implements IOcariotPubSub {

    private readonly _connConfig: IConnConfiguration | string
    private readonly _connOpt: IConnOptions

    private _pubConnection: PubSub
    private _subConnection: PubSub
    private _clientConnection: PubSub
    private _serverConnection: PubSub

    constructor(private _appName: string, connParams?: IConnConfig | string, connOptions?: IConnOpt) {
        super()

        this._connConfig = { vhost: Configurations.VHOST, ...defaultConnConfig } as IConnConfiguration

        if (typeof connParams === 'object') {
            this._connConfig = { ...this._connConfig, ...connParams } as IConnConfiguration
        }

        if (typeof connParams === 'string') {
            this._connConfig = connParams.concat('/').concat(Configurations.VHOST)
        }

        this._connOpt = { ...defaultConnOpt, rcp_timeout: Configurations.RPC_TIMEOUT, ...connOptions } as IConnOptions

        this._pubConnection = new PubSub()
        this._subConnection = new PubSub()
        this._clientConnection = new PubSub()
        this._serverConnection = new PubSub()

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

        await this._pubConnection.initializedConnection

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
            ExchangeName.FAT_BODIES, RoutingKeysName.SAVE_FAT_BODIES, callback)
    }

    public subDeleteBodyFat(callback: (err, message: any) => void): void {
        this.sub(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.FAT_BODIES, RoutingKeysName.DELETE_FAT_BODIES, callback)
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

    public logger(enabled: boolean, level?: string): void {

        if (level === 'warn' || level === 'error' || level === 'info' || !level)
            this._pubConnection.logger(enabled, level)

    }

    public receiveFromYourself(value: boolean): boolean {
        return null
        // return this._pubConnection.receiveFromYourself(value)
    }

}
