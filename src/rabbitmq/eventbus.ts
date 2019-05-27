
import { IOptions } from '../port/configuration.inteface'

import { ConnectionRabbitMQ } from './connection.rabbitmq'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
import { IEventbusInterface } from '../port/eventbus.interface'
import { IEventHandler } from '../port/event.handler.interface'

export class EventBus implements IEventbusInterface{

    private pubconnection: ConnectionRabbitMQ = new ConnectionRabbitMQ()
    private subconnection: ConnectionRabbitMQ = new ConnectionRabbitMQ()

    public connect(host: string, port: number, username: string, password: string,
                   options?: IOptions): Promise<boolean | OcariotPubSubException>{

        return new Promise<boolean | OcariotPubSubException>(async (resolve, reject) => {
            try {
                await this.pubconnection.tryConnect(host, port, username, password, options)
                await this.subconnection.tryConnect(host, port, username, password, options)
                return resolve(true)
            }catch (err) {
                reject(new OcariotPubSubException(err))
                return false
            }
        })
    }

    public close(): Promise<boolean | OcariotPubSubException> {
        return new Promise<boolean | OcariotPubSubException>((resolve, reject) => {
            try {
                if (this.pubconnection.closeConnection() && this.subconnection.closeConnection()) {
                    return resolve(true)
                }
            } catch (err) {
                reject(new OcariotPubSubException(err))
                return false
            }
        })
    }

    get isConnected(): boolean {
        if (!this.pubconnection.isConnected || !this.pubconnection.isConnected)
            return false
        return true
    }

    public publish(exchangeName: string, topicKey: string, message: any ):  Promise<boolean | OcariotPubSubException>{

        return new Promise<boolean | OcariotPubSubException>(async (resolve, reject) => {
            this.pubconnection.sendMessage(exchangeName, topicKey, message).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    public subscribe(exchangeName: string, queueName: string, routing_key: string,
                     callback: IEventHandler<any> ): Promise<boolean | OcariotPubSubException>{
        return new Promise<boolean | OcariotPubSubException>(async (resolve, reject) => {
            this.subconnection.receiveMessage(exchangeName, queueName, routing_key, callback).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    public receiveFromYourself(value: boolean): boolean {
        this.subconnection.receiveFromYourself = value
        return this.subconnection.receiveFromYourself
    }

    public loggerConnection(enabled: boolean, level?: string): boolean{
        try {
            return this.pubconnection.logger(enabled, level) && this.subconnection.logger(enabled, level)
        }catch (e) {
            return false
        }
    }
}
