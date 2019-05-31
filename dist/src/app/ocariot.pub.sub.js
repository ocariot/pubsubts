"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventbus_1 = require("../rabbitmq/eventbus");
const events_1 = require("events");
const ocariotPubSub_exception_1 = require("../exception/ocariotPubSub.exception");
const routing_keys_name_1 = require("../utils/routing.keys.name");
const exchange_name_1 = require("../utils/exchange.name");
const event_name_1 = require("../utils/event.name");
const queue_name_1 = require("../utils/queue.name");
class OcariotPubSub extends events_1.EventEmitter {
    constructor(host, port, username, password, options) {
        super();
        this.connection = new eventbus_1.EventBus();
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.options = options;
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(this.host, this.port, this.username, this.password, this.options).then(() => {
                this.emit('connected');
                return resolve(true);
            }).catch(err => {
                this.emit('error');
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.close().then(() => {
                this.emit('disconnected');
                return resolve(true);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    get isConnected() {
        return this.connection.isConnected;
    }
    pub(exchangeName, routingKey, body) {
        return this.connection.publish(exchangeName, routingKey, body);
    }
    sub(exchangeName, queueName, routingKey, callback) {
        const eventCallback = {
            handle: callback
        };
        return this.connection.subscribe(exchangeName, queueName, routingKey, eventCallback);
    }
    pubSavePhysicalActivity(activity) {
        const message = {
            event_name: event_name_1.EventName.SAVE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        };
        return this.pub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, message);
    }
    pubUpdatePhysicalActivity(activity) {
        const message = {
            event_name: event_name_1.EventName.UPDATE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        };
        return this.pub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, message);
    }
    pubDeletePhysicalActivity(activity) {
        const message = {
            event_name: event_name_1.EventName.DELETE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        };
        return this.pub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, message);
    }
    pubSaveSleep(sleep) {
        const message = {
            event_name: event_name_1.EventName.SAVE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        };
        return this.pub(exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.SAVE_SLEEP, message);
    }
    pubUpdateSleep(sleep) {
        const message = {
            event_name: event_name_1.EventName.UPDATE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        };
        return this.pub(exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.UPDATE_SLEEP, message);
    }
    pubDeleteSleep(sleep) {
        const message = {
            event_name: event_name_1.EventName.DELETE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        };
        return this.pub(exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.DELETE_SLEEP, message);
    }
    pubSaveEnvironment(environment) {
        const message = {
            event_name: event_name_1.EventName.SAVE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        };
        return this.pub(exchange_name_1.ExchangeName.ENVIRONMENTS, routing_keys_name_1.RoutingKeysName.SAVE_ENVIRONMENTS, message);
    }
    pubDeleteEnvironment(environment) {
        const message = {
            event_name: event_name_1.EventName.DELETE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        };
        return this.pub(exchange_name_1.ExchangeName.ENVIRONMENTS, routing_keys_name_1.RoutingKeysName.DELETE_ENVIRONMENTS, message);
    }
    pubUpdateChild(child) {
        const message = {
            event_name: event_name_1.EventName.UPDATE_CHILD_EVENT,
            timestamp: new Date().toISOString(),
            child
        };
        return this.pub(exchange_name_1.ExchangeName.CHILDREN, routing_keys_name_1.RoutingKeysName.UPDATE_CHILDREN, message);
    }
    pubUpdateFamily(family) {
        const message = {
            event_name: event_name_1.EventName.UPDATE_FAMILY_EVENT,
            timestamp: new Date().toISOString(),
            family
        };
        return this.pub(exchange_name_1.ExchangeName.FAMILIES, routing_keys_name_1.RoutingKeysName.UPDATE_FAMILIES, message);
    }
    pubUpdateEducator(educator) {
        const message = {
            event_name: event_name_1.EventName.UPDATE_EDUCATOR_EVENT,
            timestamp: new Date().toISOString(),
            educator
        };
        return this.pub(exchange_name_1.ExchangeName.EDUCATORS, routing_keys_name_1.RoutingKeysName.UPDATE_EDUCATORS, message);
    }
    pubUpdateHealthProfessional(healthprofessional) {
        const message = {
            event_name: event_name_1.EventName.UPDATE_HEALTH_PROFESSIONAL_EVENT,
            timestamp: new Date().toISOString(),
            healthprofessional
        };
        return this.pub(exchange_name_1.ExchangeName.HEALTH_PROFESSIONALS, routing_keys_name_1.RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, message);
    }
    pubUpdateApplication(application) {
        const message = {
            event_name: event_name_1.EventName.UPDATE_APPLICATION_EVENT,
            timestamp: new Date().toISOString(),
            application
        };
        return this.pub(exchange_name_1.ExchangeName.APPLICATIONS, routing_keys_name_1.RoutingKeysName.UPDATE_APPLICATIONS, message);
    }
    pubDeleteUser(user) {
        const message = {
            event_name: event_name_1.EventName.DELETE_USER_EVENT,
            timestamp: new Date().toISOString(),
            user
        };
        return this.pub(exchange_name_1.ExchangeName.USERS, routing_keys_name_1.RoutingKeysName.DELETE_USERS, message);
    }
    pubDeleteInstitution(institution) {
        const message = {
            event_name: event_name_1.EventName.DELETE_INSTITUTION_EVENT,
            timestamp: new Date().toISOString(),
            institution
        };
        return this.pub(exchange_name_1.ExchangeName.INSTITUTIONS, routing_keys_name_1.RoutingKeysName.DELETE_INSTITUTIONS, message);
    }
    subSavePhysicalActivity(callback) {
        return this.sub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, callback);
    }
    subUpdatePhysicalActivity(callback) {
        return this.sub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, callback);
    }
    subDeletePhysicalActivity(callback) {
        return this.sub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, callback);
    }
    subSaveSleep(callback) {
        return this.sub(exchange_name_1.ExchangeName.SLEEP, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.SAVE_SLEEP, callback);
    }
    subUpdateSleep(callback) {
        return this.sub(exchange_name_1.ExchangeName.SLEEP, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.UPDATE_SLEEP, callback);
    }
    subDeleteSleep(callback) {
        return this.sub(exchange_name_1.ExchangeName.SLEEP, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.DELETE_SLEEP, callback);
    }
    subSaveEnvironment(callback) {
        return this.sub(exchange_name_1.ExchangeName.ENVIRONMENTS, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.SAVE_ENVIRONMENTS, callback);
    }
    subDeleteEnvironment(callback) {
        return this.sub(exchange_name_1.ExchangeName.ENVIRONMENTS, queue_name_1.QueueName.OCARIOT_ACTIVITY_SERVICE, routing_keys_name_1.RoutingKeysName.DELETE_ENVIRONMENTS, callback);
    }
    subUpdateChild(callback) {
        return this.sub(exchange_name_1.ExchangeName.CHILDREN, queue_name_1.QueueName.OCARIOT_ACCOUNT_SERVICE, routing_keys_name_1.RoutingKeysName.UPDATE_CHILDREN, callback);
    }
    subUpdateFamily(callback) {
        return this.sub(exchange_name_1.ExchangeName.FAMILIES, queue_name_1.QueueName.OCARIOT_ACCOUNT_SERVICE, routing_keys_name_1.RoutingKeysName.UPDATE_FAMILIES, callback);
    }
    subUpdateEducator(callback) {
        return this.sub(exchange_name_1.ExchangeName.EDUCATORS, queue_name_1.QueueName.OCARIOT_ACCOUNT_SERVICE, routing_keys_name_1.RoutingKeysName.UPDATE_EDUCATORS, callback);
    }
    subUpdateHealthProfessional(callback) {
        return this.sub(exchange_name_1.ExchangeName.HEALTH_PROFESSIONALS, queue_name_1.QueueName.OCARIOT_ACCOUNT_SERVICE, routing_keys_name_1.RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, callback);
    }
    subUpdateApplication(callback) {
        return this.sub(exchange_name_1.ExchangeName.APPLICATIONS, queue_name_1.QueueName.OCARIOT_ACCOUNT_SERVICE, routing_keys_name_1.RoutingKeysName.UPDATE_APPLICATIONS, callback);
    }
    subDeleteUser(callback) {
        return this.sub(exchange_name_1.ExchangeName.USERS, queue_name_1.QueueName.OCARIOT_ACCOUNT_SERVICE, routing_keys_name_1.RoutingKeysName.DELETE_USERS, callback);
    }
    subDeleteInstitution(callback) {
        return this.sub(exchange_name_1.ExchangeName.INSTITUTIONS, queue_name_1.QueueName.OCARIOT_ACCOUNT_SERVICE, routing_keys_name_1.RoutingKeysName.DELETE_INSTITUTIONS, callback);
    }
    receiveFromYourself(status) {
        return this.connection.receiveFromYourself(status);
    }
    logger(enabled, level) {
        if (level === 'warn' || level === 'error' || level === 'info' || !level)
            return this.connection.loggerConnection(!enabled, level);
        return false;
    }
}
exports.OcariotPubSub = OcariotPubSub;
