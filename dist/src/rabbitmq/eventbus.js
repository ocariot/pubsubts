"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_rabbitmq_1 = require("./connection.rabbitmq");
const events_1 = require("events");
const ocariotPubSub_exception_1 = require("../exception/ocariotPubSub.exception");
class EventBus extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.pubconection = new connection_rabbitmq_1.ConnectionRabbitMQ;
        this.subconection = new connection_rabbitmq_1.ConnectionRabbitMQ;
    }
    connect(host, port, username, password, options) {
        return new Promise((resolve, reject) => {
            this.pubconection.tryConnect(host, port, username, password, options).then(() => {
                this.subconection.tryConnect(host, port, username, password, options).then(() => {
                    return resolve(true);
                }).catch(err => {
                    reject(new ocariotPubSub_exception_1.OcariotPubSubException(err).toJson());
                });
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err).toJson());
            });
            return false;
        });
    }
    close() {
        if (this.pubconection.closeConnection() && this.subconection.closeConnection()) {
            return true;
        }
        return false;
    }
    get isConnected() {
        if (!this.pubconection.isConnected || !this.pubconection.isConnected)
            return false;
        return true;
    }
    publish() {
        // var exchange = connection.declareExchange('topic_logs', 'topic', {durable: true});
        return false;
    }
    subscribe() {
        return false;
    }
}
exports.EventBus = EventBus;
