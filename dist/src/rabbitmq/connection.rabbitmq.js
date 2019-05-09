"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_factory_rabbitmq_1 = require("./connection.factory.rabbitmq");
/**
 * Implementation of the interface that provides conn with RabbitMQ.
 * To implement the RabbitMQ abstraction the amqp-ts library was used.
 *
 * @see {@link https://github.com/abreits/amqp-ts} for more details.
 * @implements {IConnectionEventBus}
 */
class ConnectionRabbitMQ {
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
                // connection.declareExchange('topic_logs', 'topic', {durable: false});
                // connection.declareQueue('', {exclusive: true});
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
}
exports.ConnectionRabbitMQ = ConnectionRabbitMQ;
