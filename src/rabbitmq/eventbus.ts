
import { IOptions } from "../port/configuration.inteface"


import { ConnectionRabbitMQ } from './connection.rabbitmq'
import {EventEmitter} from 'events';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
import { IEventbusInterface } from '../port/eventbus.interface'



export class EventBus extends EventEmitter implements IEventbusInterface{

    private pubconection: ConnectionRabbitMQ = new ConnectionRabbitMQ;
    private subconection: ConnectionRabbitMQ = new ConnectionRabbitMQ;

    public connect(host : string, port : number, username : string, password : string, options ?: IOptions): Promise<boolean | OcariotPubSubException>{

        return new Promise<boolean | OcariotPubSubException>((resolve, reject) => {
            this.pubconection.tryConnect(host, port, username, password, options).then( () =>{
                this.subconection.tryConnect(host, port, username, password, options).then(()=>{
                    return resolve(true);
                }).catch(err =>{
                    reject(new OcariotPubSubException(err).toJson());
                })
            }).catch(err =>{
                reject(new OcariotPubSubException(err).toJson());
            })
            return false;
        })
    }

    public close():boolean{
        if (this.pubconection.closeConnection() && this.subconection.closeConnection()) {
            return true;
        }
        return false;
    }

    get isConnected(): boolean {
        if (!this.pubconection.isConnected || !this.pubconection.isConnected)
            return false
        return true;
    }

    public publish(): boolean{

        // var exchange = connection.declareExchange('topic_logs', 'topic', {durable: true});

        return false;
    }

    public subscribe(): boolean{
        return false;
    }
}
