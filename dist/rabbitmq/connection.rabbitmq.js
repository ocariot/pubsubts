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
     * @param retries Total attempts to be made until give up reconnecting
     * @param interval Interval in milliseconds between each attempt
     * @return Promise<void>
     */
    tryConnect(configuration) {
        return new Promise((resolve, reject) => {
            if (this._connection)
                return resolve();
            new connection_factory_rabbitmq_1.ConnectionFactoryRabbitMQ(configuration)
                .createConnection()
                .then((connection) => {
                this._connection = connection;
                return resolve();
            })
                .catch(err => {
                this._connection = undefined;
                return reject(err);
            });
        });
    }
    closeConnection() {
        // @ts-ignore
        if (!_connection) {
            // @ts-ignore
            this._connection.close();
            return true;
        }
        else
            return false;
        throw new Error("Method not implemented.");
    }
}
exports.ConnectionRabbitMQ = ConnectionRabbitMQ;
