import { EventBus } from '../rabbitmq/eventbus'
import { IOcariotPubInterface } from '../port/ocariot.pub.interface'
import { IOcariotSubInterface } from '../port/ocariot.sub.interface'
import { EventEmitter } from 'events'
import { IOptions } from '../port/configuration.inteface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
import {
    IMessage, IMessageApplication,
    IMessageChild, IMessageEducator,
    IMessageEnvironment, IMessageFamily, IMessageHealthProfessional, IMessageInstitution,
    IMessagePhysicalActivity,
    IMessageSleep, IMessageUser
} from '../port/message.interface'
import { Default } from '../utils/default'
import { IEventHandler } from '../port/event.handler.interface'

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

    public pub(exchangeName: string, routing_key: string, body: object): Promise<boolean | OcariotPubSubException> {
        try {
            return Promise.resolve(this.connection.publish(exchangeName, routing_key, body))
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public pubSavePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.SAVE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.PHYSICAL_ACTIVITIES_RESOURCE, Default.PHYSICAL_ACTIVITIES_RESOURCE +
                Default.SAVE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubUpdatePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                Default.PHYSICAL_ACTIVITIES_RESOURCE + Default.UPDATE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubDeletePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessagePhysicalActivity = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                Default.PHYSICAL_ACTIVITIES_RESOURCE + Default.DELETE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubSaveSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.SAVE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.SLEEP_RESOURCE,
                Default.SLEEP_RESOURCE + Default.SAVE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubUpdateSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.SLEEP_RESOURCE,
                Default.SLEEP_RESOURCE + Default.UPDATE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubDeleteSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageSleep = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.SLEEP_RESOURCE,
                Default.SLEEP_RESOURCE + Default.DELETE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubSaveEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEnvironment = {
            event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.SAVE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            environment
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.ENVIRONMENTS_RESOURCE,
                Default.ENVIRONMENTS_RESOURCE + Default.SAVE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEnvironment = {
            event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            environment
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.ENVIRONMENTS_RESOURCE,
                Default.ENVIRONMENTS_RESOURCE + Default.DELETE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubUpdateChild(child: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageChild = {
            event_name: Default.CHILD_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            child
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.CHILDREN_RESOURCE,
                Default.CHILDREN_RESOURCE + Default.UPDATE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubUpdateFamily(family: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageFamily = {
            event_name: Default.FAMILY_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            family
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.FAMILIES_RESOURCE,
                Default.FAMILIES_RESOURCE + Default.UPDATE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubUpdateEducator(educator: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageEducator = {
            event_name: Default.EDUCATOR_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            educator
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.EDUCATORS_RESOURCE,
                Default.EDUCATORS_RESOURCE + Default.UPDATE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubUpdateHealthProfessional(healthprofessional: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageHealthProfessional = {
            event_name: Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            healthprofessional
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.HEALTH_PROFESSIONALS_RESOURCE,
                Default.HEALTH_PROFESSIONALS_RESOURCE + Default.UPDATE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubUpdateApplication(application: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageApplication = {
            event_name: Default.APPLICATION_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            application
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.APPLICATIONS_RESOURCE,
                Default.APPLICATIONS_RESOURCE + Default.UPDATE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubDeleteUser(user: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageUser = {
            event_name: Default.USER_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            user
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.USERS_RESOURCE,
                Default.USERS_RESOURCE + Default.DELETE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public pubDeleteInstitution(institution: any): Promise<boolean | OcariotPubSubException> {
        const message: IMessageInstitution = {
            event_name: Default.INSTITUTION_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            institution
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.INSTITUTIONS_RESOURCE,
                Default.INSTITUTIONS_RESOURCE + Default.DELETE_ACTION, message).then((result) => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public sub(exchangeName: string, queueName: string, routing_key: string,
               callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        try {
            const eventCallback: IEventHandler<any> = {
                event_name: undefined,
                handle: callback
            }

            return Promise.resolve(this.connection.subscribe(exchangeName, queueName, routing_key, eventCallback))
        }catch (err) {
            return Promise.reject(err)
        }
    }

    public subSavePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        const eventCallback: IEventHandler<any> = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.SAVE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.PHYSICAL_ACTIVITIES_RESOURCE + Default.SAVE_ACTION, eventCallback).then(result => {
                    resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subUpdatePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        const eventCallback: IEventHandler<any> = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.PHYSICAL_ACTIVITIES_RESOURCE + Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public subDeletePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        const eventCallback: IEventHandler<any> = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.DELETE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.PHYSICAL_ACTIVITIES_RESOURCE + Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public subSaveSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.SAVE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.SLEEP_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.SLEEP_RESOURCE + Default.SAVE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public subUpdateSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.SLEEP_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.SLEEP_RESOURCE + Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public subDeleteSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {

        const eventCallback: IEventHandler<any> = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.DELETE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.SLEEP_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.SLEEP_RESOURCE + Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })
    }

    public subSaveEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.SAVE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.ENVIRONMENTS_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.ENVIRONMENTS_RESOURCE + Default.SAVE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subDeleteEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.DELETE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.ENVIRONMENTS_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.ENVIRONMENTS_RESOURCE + Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subUpdateChild(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.CHILD_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.CHILDREN_RESOURCE,
                Default.OCARIOT_ACCOUNT_SERVICE,
                Default.CHILDREN_RESOURCE + Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subUpdateFamily(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.FAMILY_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.FAMILIES_RESOURCE,
                Default.OCARIOT_ACCOUNT_SERVICE,
                Default.FAMILIES_RESOURCE + Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subUpdateEducator(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.EDUCATOR_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.EDUCATORS_RESOURCE,
                Default.OCARIOT_ACCOUNT_SERVICE,
                Default.EDUCATORS_RESOURCE + Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subUpdateHealthProfessional(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.HEALTH_PROFESSIONALS_RESOURCE,
                Default.OCARIOT_ACCOUNT_SERVICE,
                Default.HEALTH_PROFESSIONALS_RESOURCE + Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subUpdateApplication(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.APPLICATION_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.APPLICATIONS_RESOURCE,
                Default.OCARIOT_ACCOUNT_SERVICE,
                Default.APPLICATIONS_RESOURCE + Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subDeleteUser(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.USER_RESOURCE_EVENT + Default.DELETE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.USERS_RESOURCE,
                Default.OCARIOT_ACCOUNT_SERVICE,
                Default.USERS_RESOURCE + Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

    }

    public subDeleteInstitution(callback: (message: any) => void): Promise<boolean | OcariotPubSubException> {
        const eventCallback: IEventHandler<any> = {
            event_name: Default.INSTITUTION_RESOURCE_EVENT + Default.DELETE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.subscribe(Default.INSTITUTIONS_RESOURCE,
                Default.OCARIOT_ACCOUNT_SERVICE,
                Default.INSTITUTIONS_RESOURCE + Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result)
            }).catch( err => {
                reject(new OcariotPubSubException(err))
            })
        })

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
