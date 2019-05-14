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
const connection_rabbitmq_1 = require("./connection.rabbitmq");
const events_1 = require("events");
const ocariotPubSub_exception_1 = require("../exception/ocariotPubSub.exception");
class EventBus extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.pubconnection = new connection_rabbitmq_1.ConnectionRabbitMQ;
        this.subconnection = new connection_rabbitmq_1.ConnectionRabbitMQ;
    }
    connect(host, port, username, password, options) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.pubconnection.tryConnect(host, port, username, password, options);
                yield this.subconnection.tryConnect(host, port, username, password, options);
                return resolve(true);
            }
            catch (err) {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
                return false;
            }
        }));
    }
    close() {
        return new Promise((resolve, reject) => {
            try {
                if (this.pubconnection.closeConnection() && this.subconnection.closeConnection()) {
                    return resolve(true);
                }
            }
            catch (err) {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
                return false;
            }
        });
    }
    get isConnected() {
        if (!this.pubconnection.isConnected || !this.pubconnection.isConnected)
            return false;
        return true;
    }
    publish(exchangeName, topicKey, message) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                return resolve(this.pubconnection.sendMessage(exchangeName, topicKey, message));
            }
            catch (err) {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            }
        }));
    }
    subscribe(exchangeName, queueName, routing_key, callback) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                return resolve(this.subconnection.receiveMessage(exchangeName, queueName, routing_key, callback));
            }
            catch (err) {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            }
        }));
    }
}
exports.EventBus = EventBus;
