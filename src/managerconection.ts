
import { Options } from "./rabbitmq/configuration.inteface"


import { ConnectionRabbitMQ } from './rabbitmq/connection.rabbitmq'
import {EventEmitter} from 'events';
import { OcariotPubSubException } from './exception/ocariotPubSub.exception'



export class ManagerConnection extends EventEmitter{

    private pubconection: ConnectionRabbitMQ = new ConnectionRabbitMQ;
    private subconection: ConnectionRabbitMQ = new ConnectionRabbitMQ;

    public connect(host : string, port : number, username : string, password : string, options ?: Options): Promise<boolean | OcariotPubSubException>{

        return new Promise<boolean | OcariotPubSubException>((resolve, reject) => {
            this.pubconection.tryConnect(host, port, username, password, options).then( () =>{
                this.subconection.tryConnect(host, port, username, password, options).then(()=>{
                    this.emit("connection_open")
                    return resolve(true);
                }).catch(err =>{
                    this.emit("connection_error")
                    reject(new OcariotPubSubException(err).toJson());
                })
            }).catch(err =>{
                this.emit("connection_error")
                reject(new OcariotPubSubException(err).toJson());
            })
            return false;
        })


    }

    public close():boolean{
        if (this.pubconection.closeConnection() && this.subconection.closeConnection()) {
            this.emit("connection_close")
            return true;
        }
        return false;
    }

    get isConnected(): boolean {
        if (!this.pubconection.isConnected || !this.pubconection.isConnected)
            return false
        return true;
    }
}
