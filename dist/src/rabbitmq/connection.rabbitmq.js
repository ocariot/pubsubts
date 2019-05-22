"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_ts_1 = require("amqp-ts");
const connection_factory_rabbitmq_1 = require("./connection.factory.rabbitmq");
/**
 * Implementation of the interface that provides conn with RabbitMQ.
 * To implement the RabbitMQ abstraction the amqp-ts library was used.
 *
 * @see {@link https://github.com/abreits/amqp-ts} for more details.
 * @implements {IConnectionEventBus}
 */
class ConnectionRabbitMQ {
    constructor() {
        this.event_handlers = new Map();
        this.consumersInitialized = new Map();
    }
    get isConnected() {
        if (!this._connection)
            return false;
        return this._connection.isConnected;
    }
    get conn() {
        return this._connection;
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
    tryConnect(host, port, username, password, options) {
        return new Promise((resolve, reject) => {
            if (this._connection)
                return resolve(this._connection);
            new connection_factory_rabbitmq_1.ConnectionFactoryRabbitMQ(host, port, username, password, options)
                .createConnection()
                .then((connection) => {
                this._connection = connection;
                return resolve(this._connection);
            })
                .catch(err => {
                this._connection = undefined;
                return reject(err);
            });
        });
    }
    closeConnection() {
        if (this._connection) {
            this._connection.close();
            this._connection = undefined;
            return true;
        }
        else
            return false;
    }
    sendMessage(exchangeName, topicKey, message) {
        return new Promise((resolve, reject) => {
            try {
                if (this._connection) {
                    let exchange = this._connection.declareExchange(exchangeName, 'topic', { durable: true });
                    exchange.send(new amqp_ts_1.Message(message), topicKey);
                    return resolve(true);
                }
                return resolve(false);
            }
            catch (err) {
                return reject(err);
            }
        });
    }
    receiveMessage(exchangeName, queueName, topicKey, callback) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._connection) {
                    let exchange = this._connection.declareExchange(exchangeName, 'topic', { durable: true });
                    if (yield exchange.initialized) {
                        this.event_handlers.set(callback.event_name, callback);
                    }
                    let queue = this._connection.declareQueue(queueName, { exclusive: true });
                    queue.bind(exchange, topicKey);
                    if (!this.consumersInitialized.get(queueName)) {
                        this.consumersInitialized.set(queueName, true);
                        queue.activateConsumer((message) => {
                            message.ack(); // acknowledge that the message has been received (and processed)
                            // if (message.properties.appId === Default.APP_ID && this._receive_from_yourself === false) return
                            // this._logger.info(`Bus event message received!`)
                            const event_name = message.getContent().event_name;
                            const event_handler = this.event_handlers.get(event_name);
                            this.event_handlers.get(event_name);
                            if (event_handler) {
                                event_handler.handle(message.getContent());
                            }
                        }, { noAck: false })
                            .catch(err => {
                            return reject(err);
                        });
                    }
                    return resolve(true);
                }
                return resolve(false);
            }
            catch (err) {
                return reject(err);
            }
        }));
    }
}
exports.ConnectionRabbitMQ = ConnectionRabbitMQ;
