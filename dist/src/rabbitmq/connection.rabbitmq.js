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
const custom_logger_1 = require("../utils/custom.logger");
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
        this._receiveFromYourself = false;
        this._logger = new custom_logger_1.CustomLogger();
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
                this._logger.info('Connection realized with success! ');
                return resolve(this._connection);
            })
                .catch(err => {
                switch (err.code) {
                    case 'ENOTFOUND' || 'SELF_SIGNED_CERT_IN_CHAIN' || 'ECONNREFUSED':
                        this._logger.error('Error during the connection. Error code: ' + err.code);
                        break;
                    case '...':
                        this._logger.warn('Error during the connection Error code: ' + err.code);
                        break;
                    default:
                        this._logger.error('Error during the connection no mapped');
                        break;
                }
                this._connection = undefined;
                return reject(err);
            });
        });
    }
    closeConnection() {
        if (this._connection) {
            this._connection.close();
            this._connection = undefined;
            this._logger.info('Connection closed with success!');
            return true;
        }
        else
            return false;
    }
    sendMessage(exchangeName, topicKey, message) {
        return new Promise((resolve, reject) => {
            try {
                if (this._connection) {
                    if (!ConnectionRabbitMQ.idConnection)
                        ConnectionRabbitMQ.idConnection = 'id-' + Math.random().toString(36).substr(2, 16);
                    let exchange = this._connection.declareExchange(exchangeName, 'topic', { durable: true });
                    const msg = new amqp_ts_1.Message(message);
                    msg.properties.appId = ConnectionRabbitMQ.idConnection;
                    exchange.send(msg, topicKey);
                    this._logger.info('Bus event message sent with success!');
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
                        this._logger.info('Callback message ' + callback.event_name + ' registered!');
                    }
                    let queue = this._connection.declareQueue(queueName, { exclusive: true });
                    queue.bind(exchange, topicKey);
                    if (!this.consumersInitialized.get(queueName)) {
                        this.consumersInitialized.set(queueName, true);
                        this._logger.info('Queue creation ' + queueName + ' realized with success!');
                        queue.activateConsumer((message) => {
                            message.ack(); // acknowledge that the message has been received (and processed)
                            if (message.properties.appId === ConnectionRabbitMQ.idConnection && this._receiveFromYourself === false)
                                return;
                            this._logger.info(`Bus event message received with success!`);
                            const event_name = message.getContent().event_name;
                            const event_handler = this.event_handlers.get(event_name);
                            this.event_handlers.get(event_name);
                            if (event_handler) {
                                event_handler.handle(message.getContent());
                            }
                        }, { noAck: false }).then((result) => {
                            this._logger.info('Queue consumer' + queue.name + 'successfully created! ');
                        })
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
    set receiveFromYourself(value) {
        this._receiveFromYourself = value;
    }
    get receiveFromYourself() {
        return this._receiveFromYourself;
    }
    logger(enabled, level) {
        return this._logger.changeLoggerConfiguration(enabled, level);
    }
}
exports.ConnectionRabbitMQ = ConnectionRabbitMQ;
