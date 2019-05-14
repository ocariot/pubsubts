"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventbus_1 = require("../rabbitmq/eventbus");
const events_1 = require("events");
const ocariotPubSub_exception_1 = require("../exception/ocariotPubSub.exception");
const default_1 = require("../utils/default");
class OcariotPubSub extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.connection = new eventbus_1.EventBus();
    }
    connect(host, port, username, password, options) {
        return new Promise((resolve, reject) => {
            this.connection.connect(host, port, username, password, options).then(() => {
                this.emit("connection_open");
                return resolve(true);
            }).catch(err => {
                this.emit("connection_error");
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.close().then(() => {
                this.emit("connection_close");
                return resolve(true);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    get isConnected() {
        return this.connection.isConnected;
    }
    pub(exchangeName, routing_key, body) {
        try {
            return Promise.resolve(this.connection.publish(exchangeName, routing_key, body));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    pubDeleteEnvironment(environment) {
        let message = {
            event_name: default_1.Default.ENVIRONMENTS_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: "1557774482",
            environment: environment
        };
        this.connection.publish(default_1.Default.ENVIRONMENTS_RESOURCE, default_1.Default.ENVIRONMENTS_RESOURCE + default_1.Default.DELETE_ACTION, message);
        return undefined;
    }
    pubDeletePhysicalActivity(activity) {
        return undefined;
    }
    pubDeleteSleep(sleep) {
        return undefined;
    }
    pubSaveEnvironment(environment) {
        return undefined;
    }
    pubSavePhysicalActivity(activity) {
        return undefined;
    }
    pubSaveSleep(sleep) {
        return undefined;
    }
    pubUpdatePhysicalActivity(activity) {
        return undefined;
    }
    pubUpdateSleep(sleep) {
        return undefined;
    }
    sub(exchangeName, queueName, routing_key, callback) {
        try {
            return Promise.resolve(this.connection.subscribe(exchangeName, queueName, routing_key, callback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subDeleteEnvironment(callback) {
        return undefined;
    }
    subDeletePhysicalActivity(callback) {
        return undefined;
    }
    subDeleteSleep(callback) {
        return undefined;
    }
    subSaveEnvironment(callback) {
        return undefined;
    }
    subSavePhysicalActivity(callback) {
        return undefined;
    }
    subSaveSleep(callback) {
        return undefined;
    }
    subUpdatePhysicalActivity(callback) {
        return undefined;
    }
    subUpdateSleep(callback) {
        return undefined;
    }
}
exports.OcariotPubSub = OcariotPubSub;
