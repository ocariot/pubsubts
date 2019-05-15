import { EventBus } from '../rabbitmq/eventbus'
import { IOcariotPubInterface } from '../port/ocariot.pub.interface'
import { IOcariotSubInterface } from '../port/ocariot.sub.interface'
import { EventEmitter } from "events"
import { IOptions } from '../port/configuration.inteface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
import { IMessage, IMessageEnvironment } from '../port/message.interface'
import { Default } from '../utils/default'

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

    pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException> {
        let message: IMessageEnvironment = {
            event_name: Default.ENVIRONMENTS_RESOURCE_EVENT + Default.DELETE_EVENT ,
            timestamp: "1557774482",
            environment: environment
        }

        this.connection.publish(Default.ENVIRONMENTS_RESOURCE, Default.ENVIRONMENTS_RESOURCE+Default.DELETE_ACTION, message)
        return undefined;
    }

    pubDeletePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    pubDeleteSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    pubSaveEnvironment(environment: IMessage): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    pubSavePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    pubSaveSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    pubUpdatePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    pubUpdateSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    sub(exchangeName: string, queueName: string, routing_key: string,  callback: (message:any) => void): Promise<boolean | OcariotPubSubException> {

        try {
            return Promise.resolve(this.connection.subscribe(exchangeName, queueName, routing_key, callback))
        }catch (err) {
            return Promise.reject(err);
        }
    }

    subDeleteEnvironment(callback: Function): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    subDeletePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    subDeleteSleep(callback: Function): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    subSaveEnvironment(callback: Function): Promise<boolean | OcariotPubSubException>{
        return undefined;
    }

    subSavePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>{
        return undefined;
    }

    subSaveSleep(callback: Function): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    subUpdatePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

    subUpdateSleep(callback: Function): Promise<boolean | OcariotPubSubException> {
        return undefined;
    }

}
