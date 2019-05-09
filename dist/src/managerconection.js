"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_rabbitmq_1 = require("./rabbitmq/connection.rabbitmq");
const events_1 = require("events");
const ocariotPubSub_exception_1 = require("./exception/ocariotPubSub.exception");
class ManagerConnection extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.pubconection = new connection_rabbitmq_1.ConnectionRabbitMQ;
        this.subconection = new connection_rabbitmq_1.ConnectionRabbitMQ;
    }
    connect(host, port, username, password, options) {
        return new Promise((resolve, reject) => {
            this.pubconection.tryConnect(host, port, username, password, options).then(() => {
                this.subconection.tryConnect(host, port, username, password, options).then(() => {
                    this.emit("connection_open");
                    return resolve(true);
                }).catch(err => {
                    this.emit("connection_error");
                    reject(new ocariotPubSub_exception_1.OcariotPubSubException(err).toJson());
                });
            }).catch(err => {
                this.emit("connection_error");
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err).toJson());
            });
            return false;
        });
    }
    close() {
        if (this.pubconection.closeConnection() && this.subconection.closeConnection()) {
            this.emit("connection_close");
            return true;
        }
        return false;
    }
    get isConnected() {
        if (!this.pubconection.isConnected || !this.pubconection.isConnected)
            return false;
        return true;
    }
}
exports.ManagerConnection = ManagerConnection;
