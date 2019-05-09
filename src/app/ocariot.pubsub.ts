import { EventBus } from '../rabbitmq/eventbus'
import { IOcariotPubInterface } from '../port/ocariot.pub.interface'
import { IOcariotSubInterface } from '../port/ocariot.sub.interface'
import { EventEmitter } from "events"
import { IOptions } from '../port/configuration.inteface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export class OcariotPubsub extends EventEmitter{// implements IOcariotPubInterface, IOcariotSubInterface{

    connection: EventBus = new EventBus;

    connect(host : string, port : number, username : string, password : string, options ?: IOptions): Promise<boolean | OcariotPubSubException>{
        return new Promise<boolean|OcariotPubSubException>((resolve, reject)=>{
            this.connection.connect(host, port, username, password, options).then(()=>{
                this.emit("connection_open")
                return resolve(true);
            }).catch(err =>{
                this.emit("connection_error")
                reject(err);
            })

        })
    }

    public close():boolean{
        if(this.connection.close()){
            this.emit("connection_close")
            return true;
        }
        return false;
    }

    get isConnected(): boolean {
        return this.connection.isConnected;
    }
    //
    // pub(exchange: string, routing_key: string, body: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubDeleteEnvironment(environment: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubDeletePhysicalActivity(activity: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubDeleteSleep(sleep: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubSaveEnvironment(environment: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubSavePhysicalActivity(activity: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubSaveSleep(sleep: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubUpdatePhysicalActivity(activity: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // pubUpdateSleep(sleep: object): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // sub(exchange: string, queue: string, routing_key: string, callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subDeleteEnvironment(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subDeletePhysicalActivity(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subDeleteSleep(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subSaveEnvironment(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subSavePhysicalActivity(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subSaveSleep(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subUpdatePhysicalActivity(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }
    //
    // subUpdateSleep(callback: Function): boolean | OcariotPubSubException {
    //     return undefined;
    // }


}
