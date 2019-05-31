import { Connection, Message, Queue } from 'amqp-ts'
import { IConnectionEventBus } from '../port/connection.event.bus.interface'
import { ConnectionFactoryRabbitMQ } from './connection.factory.rabbitmq'

import {IOptions} from '../port/configuration.inteface'
import { IEventHandler } from '../port/event.handler.interface'
import { CustomLogger, ILogger } from '../utils/custom.logger'
import StartConsumerResult = Queue.StartConsumerResult

/**
 * Implementation of the interface that provides conn with RabbitMQ.
 * To implement the RabbitMQ abstraction the amqp-ts library was used.
 *
 * @see {@link https://github.com/abreits/amqp-ts} for more details.
 * @implements {IConnectionEventBus}
 */
export class ConnectionRabbitMQ implements IConnectionEventBus {

    private static idConnection: string

    private event_handlers: Map<string, IEventHandler<any>> = new Map<string, IEventHandler<any>>()

    private consumersInitialized: Map<string, boolean> = new Map<string, boolean>()

    private _connection?: Connection

    private _receiveFromYourself: boolean = false

    private readonly _logger: ILogger = new CustomLogger()

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
                    this._logger.info('Connection realized with success! ')
                    return resolve(this._connection)
                })
                .catch(err => {

                    switch (err.code) {
                        case 'ENOTFOUND' || 'SELF_SIGNED_CERT_IN_CHAIN' || 'ECONNREFUSED':
                            this._logger.error('Error during the connection. Error code: ' + err.code)
                            break
                        case '...':
                            this._logger.warn('Error during the connection Error code: ' + err.code)
                            break
                        default:
                            this._logger.error('No mapped e error during the connection')
                            break
                    }

                    this._connection = undefined
                    return reject(err)
                })
        })
    }

    public closeConnection(): boolean | undefined {

        if (this._connection) {
            this._connection.close()
            this._connection = undefined
            this._logger.info('Connection closed with success!')
            return true
        } else
            return false
    }

    public sendMessage(exchangeName: string, topicKey: string, message: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                if (this._connection) {

                    if (!ConnectionRabbitMQ.idConnection)
                        ConnectionRabbitMQ.idConnection = 'id-' + Math.random().toString(36).substr(2, 16)

                    const exchange = this._connection.declareExchange(exchangeName, 'topic', { durable: true })

                    const msg: Message = new Message(message)
                    msg.properties.appId = ConnectionRabbitMQ.idConnection

                    exchange.send(msg, topicKey)

                    this._logger.info('Bus event message sent with success!')

                    return resolve(true)
                }
                return resolve(false)
            }catch (err) {
                return reject(err)
            }
        })
    }

    public receiveMessage(exchangeName: string, queueName: string, topicKey: string,
                          callback: IEventHandler<any>): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                if (this._connection) {
                    const exchange = this._connection.declareExchange(exchangeName, 'topic', { durable: true })

                    if (await exchange.initialized) {
                        this.event_handlers.set(topicKey, callback)
                        this._logger.info('Callback message ' + topicKey + ' registered!')
                    }

                    const queue = this._connection.declareQueue(queueName, { exclusive: true })

                    queue.bind(exchange, topicKey)

                    if (!this.consumersInitialized.get(queueName)){
                        this.consumersInitialized.set(queueName, true)
                        this._logger.info('Queue creation ' + queueName + ' realized with success!')

                        queue.activateConsumer((message: Message) => {
                            message.ack() // acknowledge that the message has been received (and processed)

                            if (message.properties.appId === ConnectionRabbitMQ.idConnection &&
                                this._receiveFromYourself === false) return

                            this._logger.info(`Bus event message received with success!`)
                            const routingKey: string = message.fields.routingKey

                            const event_handler: IEventHandler<any> | undefined =
                                this.event_handlers.get(routingKey)

                            if (event_handler) {
                                event_handler.handle(message.getContent())
                            }
                        }, { noAck: false }).then((result: StartConsumerResult) => {
                            this._logger.info('Queue consumer' + queue.name + 'successfully created! ')
                        })
                            .catch(err => {
                                return reject(err)
                            })
                    }

                    return resolve(true)
                }

                return resolve(false)
            } catch (err) {
                return reject(err)
            }
        })
    }

    set receiveFromYourself(value: boolean) {
        this._receiveFromYourself = value
    }

    get receiveFromYourself() {
        return this._receiveFromYourself
    }

    public logger(enabled: boolean, level?: string): boolean{
        return this._logger.changeLoggerConfiguration(enabled, level)
    }
}
