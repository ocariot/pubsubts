import { EventBus } from '../rabbitmq/eventbus'
import { IOcariotPubInterface } from '../port/ocariot.pub.interface'
import { IOcariotSubInterface } from '../port/ocariot.sub.interface'
import { EventEmitter } from 'events'
import { IOptions } from '../port/configuration.inteface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
import {
    IMessage, IMessageApplication,
    IMessageChild, IMessageEducator,
    IMessageEnvironment, IMessageFamily, IMessageGeneric, IMessageHealthProfessional, IMessageInstitution,
    IMessagePhysicalActivity,
    IMessageSleep, IMessageUser
} from '../port/message.interface'
import { Default } from '../utils/default'
import { IEventHandler } from '../port/event.handler.interface'
import { RoutingKeysName } from '../utils/routing.keys.name'
import { ExchangeName } from '../utils/exchange.name'
import { EventName } from '../utils/event.name'
import { QueueName } from '../utils/queue.name'

export class OcariotPubSub extends EventEmitter implements IOcariotPubInterface, IOcariotSubInterface{

    private connection: EventBus = new EventBus()

    public connect(host: string, port: number, username: string, password: string,
                   options?: IOptions): Promise<boolean | OcariotPubSubException>{
        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.connect(host, port, username, password, options).then(() => {
                this.emit('connected')
                return resolve(true)
            }).catch(err => {
                this.emit('error')
                reject(new OcariotPubSubException(err))
            })

        })
    }

    public close(): Promise<boolean | OcariotPubSubException>{
        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
           this.connection.close().then(() => {
               this.emit('disconnected')
               return resolve(true)
           }).catch(err => {
               reject(new OcariotPubSubException(err))
           })
        })
    }

    get isConnected(): boolean {
        return this.connection.isConnected
    }

    public pub(exchangeName: string, routing_key: string, body: any): Promise<boolean | OcariotPubSubException> {
        return this.connection.publish(exchangeName, routing_key, body)

    }

    public sub(exchangeName: string, queueName: string, routingKey: string, eventName: string,
               callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        const eventCallback: IEventHandler<any> = {
            event_name: eventName,
            handle: callback
        }

        return this.connection.subscribe(exchangeName, queueName, routingKey, eventCallback)
    }

    public pubSavePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.SAVE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, message)
    }

    public pubUpdatePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.UPDATE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, message)
    }

    public pubDeletePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.DELETE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return this.pub(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, message)
    }

    public pubSaveSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: EventName.SAVE_SLEEP_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, message)
    }

    public pubUpdateSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: EventName.UPDATE_SLEEP_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, message)
    }

    public pubDeleteSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: EventName.DELETE_SLEEP_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep
        }

        return this.pub(ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP,
                message)
    }

    public pubSaveEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEnvironment = {
            event_name: EventName.SAVE_ENVIRONMENT_EVENT,
            timestamp: Default.getDataTimeUTC(),
            environment
        }

        return this.pub(ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, message)
    }

    public pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEnvironment = {
            event_name: EventName.DELETE_ENVIRONMENT_EVENT,
            timestamp: Default.getDataTimeUTC(),
            environment
        }

        return this.pub(ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, message)
    }

    public pubUpdateChild(child: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageChild = {
            event_name: EventName.UPDATE_CHILD_EVENT,
            timestamp: Default.getDataTimeUTC(),
            child
        }

        return this.pub(ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, message)
    }

    public pubUpdateFamily(family: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageFamily = {
            event_name: EventName.UPDATE_FAMILY_EVENT,
            timestamp: Default.getDataTimeUTC(),
            family
        }

        return this.pub(ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, message)
    }

    public pubUpdateEducator(educator: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEducator = {
            event_name: EventName.UPDATE_EDUCATOR_EVENT,
            timestamp: Default.getDataTimeUTC(),
            educator
        }

        return this.pub(ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, message)
    }

    public pubUpdateHealthProfessional(healthprofessional: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageHealthProfessional = {
            event_name: EventName.UPDATE_HEALTH_PROFESSIONAL_EVENT,
            timestamp: Default.getDataTimeUTC(),
            healthprofessional
        }

        return this.pub(ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, message)
    }

    public pubUpdateApplication(application: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageApplication = {
            event_name: EventName.UPDATE_APPLICATION_EVENT,
            timestamp: Default.getDataTimeUTC(),
            application
        }

        return this.pub(ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS,
                message)
    }

    public pubDeleteUser(user: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageUser = {
            event_name: EventName.DELETE_USER_EVENT,
            timestamp: Default.getDataTimeUTC(),
            user
        }

        return this.pub(ExchangeName.USERS, RoutingKeysName.DELETE_USERS, message)
    }

    public pubDeleteInstitution(institution: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageInstitution = {
            event_name: EventName.DELETE_INSTITUTION_EVENT,
            timestamp: Default.getDataTimeUTC(),
            institution
        }

        return this.pub(ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, message)

    }

    public subSavePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, EventName.SAVE_PHYSICAL_ACTIVITY_EVENT, callback)

    }

    public subUpdatePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, EventName.UPDATE_PHYSICAL_ACTIVITY_EVENT, callback)

    }

    public subDeletePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, EventName.DELETE_PHYSICAL_ACTIVITY_EVENT, callback)

    }

    public subSaveSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.SAVE_SLEEP, EventName.SAVE_SLEEP_EVENT, callback)
    }

    public subUpdateSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.UPDATE_SLEEP, EventName.UPDATE_SLEEP_EVENT, callback)
    }

    public subDeleteSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.DELETE_SLEEP, EventName.DELETE_SLEEP_EVENT, callback)
    }

    public subSaveEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.ENVIRONMENTS, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.SAVE_ENVIRONMENTS, EventName.SAVE_ENVIRONMENT_EVENT, callback)
    }

    public subDeleteEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.ENVIRONMENTS, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.DELETE_ENVIRONMENTS, EventName.DELETE_ENVIRONMENT_EVENT, callback)
    }

    public subUpdateChild(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.CHILDREN, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_CHILDREN, EventName.UPDATE_CHILD_EVENT, callback)
    }

    public subUpdateFamily(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.FAMILIES, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_FAMILIES, EventName.UPDATE_FAMILY_EVENT, callback)
    }

    public subUpdateEducator(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.EDUCATORS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_EDUCATORS, EventName.UPDATE_EDUCATOR_EVENT, callback)
    }

    public subUpdateHealthProfessional(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.HEALTH_PROFESSIONALS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, EventName.UPDATE_HEALTH_PROFESSIONAL_EVENT, callback)
    }

    public subUpdateApplication(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.APPLICATIONS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_APPLICATIONS, EventName.UPDATE_APPLICATION_EVENT, callback)
    }

    public subDeleteUser(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.USERS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.DELETE_USERS, EventName.DELETE_USER_EVENT, callback)
    }

    public subDeleteInstitution(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.INSTITUTIONS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.DELETE_INSTITUTIONS, EventName.DELETE_INSTITUTION_EVENT, callback)
    }

    public receiveFromYourself(status: boolean): boolean{
        return this.connection.receiveFromYourself(status)
    }

    public logger(enabled: boolean, level?: string): boolean {

        if (level === 'warn' || level === 'error' || level === 'info' || !level)
                return this.connection.loggerConnection(!enabled, level)

        return false

    }
}
