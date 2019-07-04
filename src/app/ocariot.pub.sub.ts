import { IOcariotPubInterface } from '../port/ocariot.pub.interface'
import { IOcariotSubInterface } from '../port/ocariot.sub.interface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
import {
    IMessageApplication,
    IMessageChild, IMessageEducator,
    IMessageEnvironment, IMessageFamily, IMessageHealthProfessional, IMessageInstitution,
    IMessagePhysicalActivity,
    IMessageSleep, IMessageUser
} from '../port/message.interface'
import { PubSub, IOptions } from 'pubsub'
import { RoutingKeysName } from '../utils/routing.keys.name'
import { ExchangeName } from '../utils/exchange.name'
import { EventName } from '../utils/event.name'
import { QueueName } from '../utils/queue.name'
import { Configurations } from '../utils/configurations'

export class OcariotPubSub implements IOcariotPubInterface, IOcariotSubInterface{

    private pubsub

    constructor(host: string, port: number, username: string, password: string,
                options?: IOptions){
        this.pubsub = new PubSub(Configurations.VHOST, host, port, username, password, options)
            .createTopicInstance()
    }

    public dispose(): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            this.pubsub.dispose().then((result) => {
                    return resolve(result)
                }).catch(err => {
                    return reject(new OcariotPubSubException(err) )
                })
        })
    }

    public pub(exchangeName: string, routingKey: string, message: any): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            this.pubsub.pub(exchangeName, routingKey, message).then((result) => {
                return resolve(result)
            }).catch(err => {
                return reject(new OcariotPubSubException(err) )
            })
        })
    }

    public sub(exchangeName: string, queueName: string, routingKey: string,
               callback: (message: any) => void): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            this.pubsub.sub(exchangeName, queueName, routingKey, callback).then((result) => {
                return resolve(result)
            }).catch(err => {
                return reject(new OcariotPubSubException(err) )
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

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, callback)

    }

    public subUpdatePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, callback)

    }

    public subDeletePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        return this.sub(ExchangeName.PHYSICAL_ACTIVITIES, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, callback)

    }

    public subSaveSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.SAVE_SLEEP, callback)
    }

    public subUpdateSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.UPDATE_SLEEP, callback)
    }

    public subDeleteSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.SLEEP, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.DELETE_SLEEP, callback)
    }

    public subSaveEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.ENVIRONMENTS, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.SAVE_ENVIRONMENTS, callback)
    }

    public subDeleteEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.ENVIRONMENTS, QueueName.OCARIOT_ACTIVITY_SERVICE,
                RoutingKeysName.DELETE_ENVIRONMENTS, callback)
    }

    public subUpdateChild(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.CHILDREN, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_CHILDREN, callback)
    }

    public subUpdateFamily(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.FAMILIES, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_FAMILIES, callback)
    }

    public subUpdateEducator(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.EDUCATORS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_EDUCATORS, callback)
    }

    public subUpdateHealthProfessional(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.HEALTH_PROFESSIONALS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, callback)
    }

    public subUpdateApplication(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.APPLICATIONS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.UPDATE_APPLICATIONS, callback)
    }

    public subDeleteUser(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.USERS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.DELETE_USERS, callback)
    }

    public subDeleteInstitution(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        return this.sub(ExchangeName.INSTITUTIONS, QueueName.OCARIOT_ACCOUNT_SERVICE,
                RoutingKeysName.DELETE_INSTITUTIONS, callback)
    }

    public logger(enabled: boolean, level?: string): boolean {

        if (level === 'warn' || level === 'error' || level === 'info' || !level)
                return this.pubsub.logger(enabled, level)

        return false

    }

    public receiveFromYourself(value: boolean): boolean {
        return this.pubsub.receiveFromYourself(value)
    }

}
