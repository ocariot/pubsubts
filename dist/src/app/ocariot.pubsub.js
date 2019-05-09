"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventbus_1 = require("../rabbitmq/eventbus");
const events_1 = require("events");
class OcariotPubsub extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.connection = new eventbus_1.EventBus;
        //
        // pub(exchange: string, routing_key: string, body: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubDeleteEnvironment(environment: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubDeletePhysicalActivity(activity: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubDeleteSleep(sleep: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubSaveEnvironment(environment: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubSavePhysicalActivity(activity: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubSaveSleep(sleep: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubUpdatePhysicalActivity(activity: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // pubUpdateSleep(sleep: object): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // sub(exchange: string, queue: string, routing_key: string, callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subDeleteEnvironment(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subDeletePhysicalActivity(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subDeleteSleep(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subSaveEnvironment(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subSavePhysicalActivity(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subSaveSleep(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subUpdatePhysicalActivity(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
        //
        // subUpdateSleep(callback: Function): boolean | OcariotPubSubException {
        //     return undefined;
        // }
    }
    connect(host, port, username, password, options) {
        return new Promise((resolve, reject) => {
            this.connection.connect(host, port, username, password, options).then(() => {
                this.emit("connection_open");
                return resolve(true);
            }).catch(err => {
                this.emit("connection_error");
                reject(err);
            });
        });
    }
    close() {
        if (this.connection.close()) {
            this.emit("connection_close");
            return true;
        }
        return false;
    }
    get isConnected() {
        return this.connection.isConnected;
    }
}
exports.OcariotPubsub = OcariotPubsub;
