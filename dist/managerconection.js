"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = NodeJS.EventEmitter;
const connection_rabbitmq_1 = require("./rabbitmq/connection.rabbitmq");
const cluster_1 = require("cluster");
class ManagerConnection extends EventEmitter {
    constructor(configuration) {
        super();
        this.pubconection = new connection_rabbitmq_1.ConnectionRabbitMQ;
        this.subconection = new connection_rabbitmq_1.ConnectionRabbitMQ;
    }
    connect(configuration) {
        this.pubconection.tryConnect(configuration).then(() => {
            this.subconection.tryConnect(configuration).then(() => {
                cluster_1.emit("connection_open");
                return true;
            }).catch(err => {
                cluster_1.emit("connection_error");
            });
        }).catch(err => {
            cluster_1.emit("connection_error");
        });
        return false;
    }
    close() {
        this.pubconection.closeConnection();
        this.subconection.closeConnection();
        return false;
    }
}
exports.ManagerConnection = ManagerConnection;
