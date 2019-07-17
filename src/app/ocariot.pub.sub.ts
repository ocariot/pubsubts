import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
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
import { IConfiguration, IOptions, PubSub } from 'pubsub'
import { RoutingKeysName } from '../utils/routing.keys.name'
import { ExchangeName } from '../utils/exchange.name'
import { EventName } from '../utils/event.name'
import { Configurations } from '../utils/configurations'
import { EventEmitter } from 'events'
import { IConfig } from '../port/connection/config.interface'
import { IOcariotPubSub } from '../port/pub/ocariot.pub.sub.interface'
import { IOpt } from '../port/connection/opt.interface'

export class OcariotPubSub extends EventEmitter implements IOcariotPubSub {

    private _pubConnection
    private _subConnection

    constructor(private _appName: string, conf: IConfig, options?: IOpt) {
        super()

        const config: IConfiguration = { vhost: Configurations.VHOST, ...conf }

        const opt: IOptions = { ...options, queue: { durable: true }, exchange: { durable: true } }

        this._pubConnection = new PubSub(config, opt).topic
        this._subConnection = new PubSub(config, opt).topic

    }

    private pubEventInitialization(): void {

        this._pubConnection.on('error_pub', (err) => {
            this.emit('error_pub', err)
        })
        this._pubConnection.on('disconnected_pub', () => {
            this.emit('disconnected_pub')
        })
        this._pubConnection.on('connected_pub', () => {
            this.emit('connected_pub')
        })
        this._pubConnection.on('lost_connection_pub', () => {
            this.emit('lost_connection_pub')
        })
        this._pubConnection.on('trying_connection_pub', () => {
            this.emit('trying_connection_pub')
        })
        this._pubConnection.on('reconnected_pub', () => {
            this.emit('reconnected_pub')
        })

    }

    private subEventInitialization(): void {

        this._subConnection.on('error_sub', (err) => {
            this.emit('error_sub', err)
        })
        this._subConnection.on('disconnected_sub', () => {
            this.emit('disconnected_sub')
        })
        this._subConnection.on('connected_sub', () => {
            this.emit('connected_sub')
        })
        this._subConnection.on('lost_connection_sub', () => {
            this.emit('lost_connection_sub')
        })
        this._subConnection.on('trying_connection_sub', () => {
            this.emit('trying_connection_sub')
        })
        this._subConnection.on('reconnected_sub', () => {
            this.emit('reconnected_sub')
        })

    }

    private clientEventInitialization(): void {

        this._pubConnection.on('error_client', (err) => {
            this.emit('error_client', err)
        })
        this._pubConnection.on('disconnected_client', () => {
            this.emit('disconnected_client')
        })
        this._pubConnection.on('connected_client', () => {
            this.emit('connected_client')
        })
        this._pubConnection.on('lost_connection_client', () => {
            this.emit('lost_connection_client')
        })
        this._pubConnection.on('trying_connection_client', () => {
            this.emit('trying_connection_client')
        })
        this._pubConnection.on('reconnected_client', () => {
            this.emit('reconnected_client')
        })

    }

    private serverEventInitialization(): void {

        this._pubConnection.on('error_server', (err) => {
            this.emit('error_server', err)
        })
        this._pubConnection.on('disconnected_server', () => {
            this.emit('disconnected_server')
        })
        this._pubConnection.on('connected_server', () => {
            this.emit('connected_server')
        })
        this._pubConnection.on('lost_connection_server', () => {
            this.emit('lost_connection_server')
        })
        this._pubConnection.on('trying_connection_server', () => {
            this.emit('trying_connection_server')
        })
        this._pubConnection.on('reconnected_server', () => {
            this.emit('reconnected_server')
        })
    }

    public dispose(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await this._pubConnection.dispose()
                await this._subConnection.dispose()
            } catch (err) {
                return reject(new OcariotPubSubException(err))
            }
        })
    }

    public pub(exchangeName: string, routingKey: string, body: any): Promise<boolean> {

        this.pubEventInitialization()

        return new Promise<boolean>((resolve, reject) => {
            this._pubConnection.pub(exchangeName, routingKey, body).then((result) => {
                return resolve(result)
            }).catch(err => {
                return reject(new OcariotPubSubException(err))
            })
        })
    }

    public sub(exchangeName: string, routingKey: string,
               callback: (message: any) => void): Promise<boolean> {

        this.subEventInitialization()

        return new Promise<boolean>((resolve, reject) => {
            this._subConnection.sub(exchangeName, this._appName, routingKey, callback).then((result) => {
                return resolve(result)
            }).catch(err => {
                return reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubSavePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.SAVE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, message)
    }

    public pubUpdatePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.UPDATE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, message)
    }

    public pubDeletePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.DELETE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, message)
    }

    public pubSaveSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: EventName.SAVE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, message)
    }

    public pubUpdateSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: EventName.UPDATE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, message)
    }

    public pubDeleteSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: EventName.DELETE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP,
            message)
    }

    public pubSaveEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEnvironment = {
            event_name: EventName.SAVE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        }

        return this.pub(ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, message)
    }

    public pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEnvironment = {
            event_name: EventName.DELETE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        }

        return this.pub(ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, message)
    }

    public pubUpdateChild(child: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageChild = {
            event_name: EventName.UPDATE_CHILD_EVENT,
            timestamp: new Date().toISOString(),
            child
        }

        return this.pub(ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, message)
    }

    public pubUpdateFamily(family: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageFamily = {
            event_name: EventName.UPDATE_FAMILY_EVENT,
            timestamp: new Date().toISOString(),
            family
        }

        return this.pub(ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, message)
    }

    public pubUpdateEducator(educator: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEducator = {
            event_name: EventName.UPDATE_EDUCATOR_EVENT,
            timestamp: new Date().toISOString(),
            educator
        }

        return this.pub(ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, message)
    }

    public pubUpdateHealthProfessional(healthprofessional: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageHealthProfessional = {
            event_name: EventName.UPDATE_HEALTH_PROFESSIONAL_EVENT,
            timestamp: new Date().toISOString(),
            healthprofessional
        }

        return this.pub(ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, message)
    }

    public pubUpdateApplication(application: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageApplication = {
            event_name: EventName.UPDATE_APPLICATION_EVENT,
            timestamp: new Date().toISOString(),
            application
        }

        return this.pub(ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS,
            message)
    }

    public pubDeleteUser(user: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageUser = {
            event_name: EventName.DELETE_USER_EVENT,
            timestamp: new Date().toISOString(),
            user
        }

        return this.pub(ExchangeName.USERS, RoutingKeysName.DELETE_USERS, message)
    }

    public pubDeleteInstitution(institution: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageInstitution = {
            event_name: EventName.DELETE_INSTITUTION_EVENT,
            timestamp: new Date().toISOString(),
            institution
        }

        return this.pub(ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, message)

    }

    public subSavePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, callback)

    }

    public subUpdatePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, callback)

    }

    public subDeletePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, callback)

    }

    public subSaveSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, callback)
    }

    public subUpdateSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, callback)
    }

    public subDeleteSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP, callback)
    }

    public subSaveEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, callback)
    }

    public subDeleteEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, callback)
    }

    public subUpdateChild(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, callback)
    }

    public subUpdateFamily(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, callback)
    }

    public subUpdateEducator(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, callback)
    }

    public subUpdateHealthProfessional(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, callback)
    }

    public subUpdateApplication(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS, callback)
    }

    public subDeleteUser(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.USERS, RoutingKeysName.DELETE_USERS, callback)
    }

    public subDeleteInstitution(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, callback)
    }

    public logger(enabled: boolean, level?: string): boolean {

        if (level === 'warn' || level === 'error' || level === 'info' || !level)
            return this._pubConnection.logger(enabled, level)

        return false

    }

    public receiveFromYourself(value: boolean): boolean {
        return this._pubConnection.receiveFromYourself(value)
    }

}
