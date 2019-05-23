import { EventBus } from '../rabbitmq/eventbus'
import { IOcariotPubInterface } from '../port/ocariot.pub.interface'
import { IOcariotSubInterface } from '../port/ocariot.sub.interface'
import { EventEmitter } from "events"
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

    private connection: EventBus = new EventBus();

    connect(host : string, port : number, username : string, password : string, options ?: IOptions): Promise<boolean | OcariotPubSubException>{
        return new Promise<boolean|OcariotPubSubException>((resolve, reject)=>{
            this.connection.connect(host, port, username, password, options).then(()=>{
                this.emit("connection_open")
                return resolve(true);
            }).catch(err =>{
                this.emit("connection_error")
                reject(new OcariotPubSubException(err))
            })

        })
    }

    public close():Promise<boolean | OcariotPubSubException>{
        return new Promise<boolean|OcariotPubSubException>((resolve,reject) => {
           this.connection.close().then(() =>{
               this.emit("connection_close")
               return resolve(true);
           }).catch(err =>{
               reject(new OcariotPubSubException(err))
           })
        })
    }

    get isConnected(): boolean {
        return this.connection.isConnected;
    }

    pub(exchangeName: string, routing_key: string, body: object): Promise<boolean | OcariotPubSubException> {
        try {
            return Promise.resolve(this.connection.publish(exchangeName, routing_key, body))
        } catch (err) {
            return Promise.reject(err);
        }
    }

    pubSavePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessagePhysicalActivity= {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.SAVE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.PHYSICAL_ACTIVITIES_RESOURCE, Default.PHYSICAL_ACTIVITIES_RESOURCE+Default.SAVE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubUpdatePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessagePhysicalActivity= {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.PHYSICAL_ACTIVITIES_RESOURCE, Default.PHYSICAL_ACTIVITIES_RESOURCE+Default.UPDATE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubDeletePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessagePhysicalActivity= {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            physicalactivity: activity
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.PHYSICAL_ACTIVITIES_RESOURCE, Default.PHYSICAL_ACTIVITIES_RESOURCE+Default.DELETE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubSaveSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageSleep = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.SAVE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep: sleep
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.SLEEP_RESOURCE, Default.SLEEP_RESOURCE+Default.SAVE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubUpdateSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageSleep = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep: sleep
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.SLEEP_RESOURCE, Default.SLEEP_RESOURCE+Default.UPDATE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubDeleteSleep(sleep: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageSleep = {
            event_name: Default.SLEEP_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            sleep: sleep
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.SLEEP_RESOURCE, Default.SLEEP_RESOURCE+Default.DELETE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubSaveEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageEnvironment = {
            event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.SAVE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            environment: environment
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.ENVIRONMENTS_RESOURCE, Default.ENVIRONMENTS_RESOURCE+Default.SAVE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageEnvironment = {
            event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            environment: environment
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.ENVIRONMENTS_RESOURCE, Default.ENVIRONMENTS_RESOURCE+Default.DELETE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubUpdateChild(child: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageChild = {
            event_name: Default.CHILD_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            child: child
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.CHILDREN_RESOURCE, Default.CHILDREN_RESOURCE+Default.UPDATE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubUpdateFamily(family: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageFamily = {
            event_name: Default.FAMILY_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            family: family
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.FAMILIES_RESOURCE, Default.FAMILIES_RESOURCE+Default.UPDATE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubUpdateEducator(educator: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageEducator = {
            event_name: Default.EDUCATOR_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            educator: educator
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.EDUCATORS_RESOURCE, Default.EDUCATORS_RESOURCE+Default.UPDATE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubUpdateHealthProfessional(healthprofessional: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageHealthProfessional = {
            event_name: Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            healthprofessional: healthprofessional
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.HEALTH_PROFESSIONALS_RESOURCE, Default.HEALTH_PROFESSIONALS_RESOURCE+Default.UPDATE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubUpdateApplication(application: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageApplication = {
            event_name: Default.APPLICATION_RESOURCE_EVENT + Default.UPDATE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            application: application
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.APPLICATIONS_RESOURCE, Default.APPLICATIONS_RESOURCE+Default.UPDATE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubDeleteUser(user: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageUser = {
            event_name: Default.USER_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            user: user
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.USERS_RESOURCE, Default.USERS_RESOURCE+Default.DELETE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    pubDeleteInstitution(institution: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageInstitution = {
            event_name: Default.INSTITUTION_RESOURCE_EVENT + Default.DELETE_EVENT,
            timestamp: Default.getDataTimeUTC(),
            institution: institution
        }

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) => {
            this.connection.publish(Default.INSTITUTIONS_RESOURCE, Default.INSTITUTIONS_RESOURCE+Default.DELETE_ACTION, message).then((result) =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        });
    }

    sub(exchangeName: string, queueName: string, routing_key: string,  callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {

        try {
            let eventCallback: IEventHandler<any> = {
                event_name: undefined,
                handle: callback
            }

            return Promise.resolve(this.connection.subscribe(exchangeName, queueName, routing_key, eventCallback))
        }catch (err) {
            return Promise.reject(err);
        }
    }

    subSavePhysicalActivity(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {

        let eventCallback: IEventHandler<any> = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.SAVE_EVENT,
            handle: callback};

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
            this.connection.subscribe(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.PHYSICAL_ACTIVITIES_RESOURCE+Default.SAVE_ACTION, eventCallback).then(result =>{
                    resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        })

    }

    subUpdatePhysicalActivity(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {

        let eventCallback: IEventHandler<any> = {
            event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.UPDATE_EVENT,
            handle: callback}

        return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
            this.connection.subscribe(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                Default.OCARIOT_ACTIVITY_SERVICE,
                Default.PHYSICAL_ACTIVITIES_RESOURCE+Default.UPDATE_ACTION, eventCallback).then(result =>{
                resolve(result)
            }).catch( err =>{
                reject(new OcariotPubSubException(err))
            })
        })
    }

    subDeletePhysicalActivity(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {

            let eventCallback: IEventHandler<any> = {
                event_name: Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + Default.DELETE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.PHYSICAL_ACTIVITIES_RESOURCE,
                    Default.OCARIOT_ACTIVITY_SERVICE,
                    Default.PHYSICAL_ACTIVITIES_RESOURCE+Default.DELETE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })
    }

    subSaveSleep(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.SLEEP_RESOURCE_EVENT + Default.SAVE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.SLEEP_RESOURCE,
                    Default.OCARIOT_ACTIVITY_SERVICE,
                    Default.SLEEP_RESOURCE+Default.SAVE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })
    }

    subUpdateSleep(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.SLEEP_RESOURCE_EVENT + Default.UPDATE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.SLEEP_RESOURCE,
                    Default.OCARIOT_ACTIVITY_SERVICE,
                    Default.SLEEP_RESOURCE+Default.UPDATE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })
    }

    subDeleteSleep(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {

            let eventCallback: IEventHandler<any> = {
                event_name: Default.SLEEP_RESOURCE_EVENT + Default.DELETE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.SLEEP_RESOURCE,
                    Default.OCARIOT_ACTIVITY_SERVICE,
                    Default.SLEEP_RESOURCE+Default.DELETE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })
    }

    subSaveEnvironment(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.SAVE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.ENVIRONMENTS_RESOURCE,
                    Default.OCARIOT_ACTIVITY_SERVICE,
                    Default.ENVIRONMENTS_RESOURCE+Default.SAVE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })


    }

    subDeleteEnvironment(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.ENVIRONMENT_RESOURCE_EVENT + Default.DELETE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.ENVIRONMENTS_RESOURCE,
                    Default.OCARIOT_ACTIVITY_SERVICE,
                    Default.ENVIRONMENTS_RESOURCE+Default.DELETE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    subUpdateChild(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.CHILD_RESOURCE_EVENT + Default.UPDATE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.CHILDREN_RESOURCE,
                    Default.OCARIOT_ACCOUNT_SERVICE,
                    Default.CHILDREN_RESOURCE+Default.UPDATE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    subUpdateFamily(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.FAMILY_RESOURCE_EVENT + Default.UPDATE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.FAMILIES_RESOURCE,
                    Default.OCARIOT_ACCOUNT_SERVICE,
                    Default.FAMILIES_RESOURCE+Default.UPDATE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    subUpdateEducator(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.EDUCATOR_RESOURCE_EVENT + Default.UPDATE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.EDUCATORS_RESOURCE,
                    Default.OCARIOT_ACCOUNT_SERVICE,
                    Default.EDUCATORS_RESOURCE+Default.UPDATE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    subUpdateHealthProfessional(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + Default.UPDATE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.HEALTH_PROFESSIONALS_RESOURCE,
                    Default.OCARIOT_ACCOUNT_SERVICE,
                    Default.HEALTH_PROFESSIONALS_RESOURCE+Default.UPDATE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    subUpdateApplication(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.APPLICATION_RESOURCE_EVENT + Default.UPDATE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.APPLICATIONS_RESOURCE,
                    Default.OCARIOT_ACCOUNT_SERVICE,
                    Default.APPLICATIONS_RESOURCE+Default.UPDATE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    subDeleteUser(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.USER_RESOURCE_EVENT + Default.DELETE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.USERS_RESOURCE,
                    Default.OCARIOT_ACCOUNT_SERVICE,
                    Default.USERS_RESOURCE+Default.DELETE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    subDeleteInstitution(callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {
            let eventCallback: IEventHandler<any> = {
                event_name: Default.INSTITUTION_RESOURCE_EVENT + Default.DELETE_EVENT,
                handle: callback}

            return new Promise<boolean|OcariotPubSubException>((resolve, reject) =>{
                this.connection.subscribe(Default.INSTITUTIONS_RESOURCE,
                    Default.OCARIOT_ACCOUNT_SERVICE,
                    Default.INSTITUTIONS_RESOURCE+Default.DELETE_ACTION, eventCallback).then(result =>{
                    resolve(result)
                }).catch( err =>{
                    reject(new OcariotPubSubException(err))
                })
            })

    }

    public receiveFromYourself(status :boolean):boolean{
        return this.connection.receiveFromYourself(status)
    }

    public logger(enabled: boolean, level?: string): boolean {

        if(!level)
            return this.connection.loggerConnection(!enabled)

        switch(level){
            case 'dev':
                return this.connection.loggerConnection(!enabled, 'debug')
                break
            case 'prod':
                return this.connection.loggerConnection(!enabled, 'info')
                break
            default:
                return false
        }



    }
}
