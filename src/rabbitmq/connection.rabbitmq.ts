import { Connection, Message } from 'amqp-ts'
import { IConnectionEventBus } from '../port/connection.event.bus.interface'
import { ConnectionFactoryRabbitMQ } from './connection.factory.rabbitmq'

import {IOptions} from "../port/configuration.inteface"
import { Default } from '../utils/default'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'


/**
 * Implementation of the interface that provides conn with RabbitMQ.
 * To implement the RabbitMQ abstraction the amqp-ts library was used.
 *
 * @see {@link https://github.com/abreits/amqp-ts} for more details.
 * @implements {IConnectionEventBus}
 */
export class ConnectionRabbitMQ implements IConnectionEventBus {

    private _connection?: Connection

    get isConnected(): boolean {
        if (!this._connection) return false
        return this._connection.isConnected
    }

    get conn(): Connection | undefined {
        return this._connection
    }

    /**
     * Routine to connect to RabbitMQ.
     * When there is no connection to RabbitMQ, new attempts
     * are made to connect according to the parameter {@link _options}
     * which sets the total number of retries and the delay
     *
     * @return Promise<void>
     * @param host
     * @param port
     * @param username
     * @param password
     * @param options
     */
    public tryConnect(host: string, port: number, username: string, password: string, options ?: IOptions): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            if (this._connection) return resolve(this._connection)

            new ConnectionFactoryRabbitMQ(host, port, username, password, options)
                .createConnection()
                .then((connection: Connection) => {
                    this._connection = connection
                    return resolve(this._connection)
                })
                .catch(err => {
                    this._connection = undefined
                    return reject(err)
                })
        })
    }

    closeConnection(): boolean | undefined {

        if (this._connection) {
            this._connection.close();
            this._connection = undefined
            return true;
        } else
            return false;
    }

    public sendMessage(exchangeName: string, topicKey: string, message: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                if (this._connection) {
                    let exchange = this._connection.declareExchange(exchangeName, 'topic', { durable: true });

                    exchange.send(new Message(message), topicKey)
                    return resolve(true);
                }
            }catch (err) {
                return reject(err)
            }
        })
    }

    public receiveMessage(exchangeName: string, queueName: string, topicKey: string, callback: (message: any) => void): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
           try {
               if (this._connection) {
                   let exchange = this._connection.declareExchange(exchangeName, 'topic', { durable: true });

                   let queue = this._connection.declareQueue(queueName, { exclusive: true });

                   queue.bind(exchange, topicKey)

                   console.log(queue.initialized)

                   queue.activateConsumer(callback)

                   return resolve(true);
               }

               return resolve(false);
           }catch (err) {
               return reject(err)
           }
        })
    }

}
