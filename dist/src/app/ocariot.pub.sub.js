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
    pub(exchangeName, routing_key, body) {
        try {
            return Promise.resolve(this.connection.publish(exchangeName, routing_key, body));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    pubSavePhysicalActivity(activity) {
        const message = {
            event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            physicalactivity: activity
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE +
                default_1.Default.SAVE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdatePhysicalActivity(activity) {
        const message = {
            event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            physicalactivity: activity
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.UPDATE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubDeletePhysicalActivity(activity) {
        const message = {
            event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            physicalactivity: activity
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.DELETE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubSaveSleep(sleep) {
        const message = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            sleep
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.SLEEP_RESOURCE, default_1.Default.SLEEP_RESOURCE + default_1.Default.SAVE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdateSleep(sleep) {
        const message = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            sleep
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.SLEEP_RESOURCE, default_1.Default.SLEEP_RESOURCE + default_1.Default.UPDATE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubDeleteSleep(sleep) {
        const message = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            sleep
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.SLEEP_RESOURCE, default_1.Default.SLEEP_RESOURCE + default_1.Default.DELETE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubSaveEnvironment(environment) {
        const message = {
            event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            environment
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.ENVIRONMENTS_RESOURCE, default_1.Default.ENVIRONMENTS_RESOURCE + default_1.Default.SAVE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubDeleteEnvironment(environment) {
        const message = {
            event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            environment
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.ENVIRONMENTS_RESOURCE, default_1.Default.ENVIRONMENTS_RESOURCE + default_1.Default.DELETE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdateChild(child) {
        const message = {
            event_name: default_1.Default.CHILD_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            child
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.CHILDREN_RESOURCE, default_1.Default.CHILDREN_RESOURCE + default_1.Default.UPDATE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdateFamily(family) {
        const message = {
            event_name: default_1.Default.FAMILY_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            family
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.FAMILIES_RESOURCE, default_1.Default.FAMILIES_RESOURCE + default_1.Default.UPDATE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdateEducator(educator) {
        const message = {
            event_name: default_1.Default.EDUCATOR_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            educator
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.EDUCATORS_RESOURCE, default_1.Default.EDUCATORS_RESOURCE + default_1.Default.UPDATE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdateHealthProfessional(healthprofessional) {
        const message = {
            event_name: default_1.Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            healthprofessional
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.HEALTH_PROFESSIONALS_RESOURCE, default_1.Default.HEALTH_PROFESSIONALS_RESOURCE + default_1.Default.UPDATE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdateApplication(application) {
        const message = {
            event_name: default_1.Default.APPLICATION_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            application
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.APPLICATIONS_RESOURCE, default_1.Default.APPLICATIONS_RESOURCE + default_1.Default.UPDATE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubDeleteUser(user) {
        const message = {
            event_name: default_1.Default.USER_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            user
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.USERS_RESOURCE, default_1.Default.USERS_RESOURCE + default_1.Default.DELETE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubDeleteInstitution(institution) {
        const message = {
            event_name: default_1.Default.INSTITUTION_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            institution
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.INSTITUTIONS_RESOURCE, default_1.Default.INSTITUTIONS_RESOURCE + default_1.Default.DELETE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    sub(exchangeName, queueName, routing_key, callback) {
        try {
            const eventCallback = {
                event_name: undefined,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(exchangeName, queueName, routing_key, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subSavePhysicalActivity(callback) {
        const eventCallback = {
            event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.SAVE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subUpdatePhysicalActivity(callback) {
        const eventCallback = {
            event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subDeletePhysicalActivity(callback) {
        const eventCallback = {
            event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subSaveSleep(callback) {
        const eventCallback = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.SLEEP_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.SLEEP_RESOURCE + default_1.Default.SAVE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subUpdateSleep(callback) {
        const eventCallback = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.SLEEP_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.SLEEP_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subDeleteSleep(callback) {
        const eventCallback = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.SLEEP_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.SLEEP_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subSaveEnvironment(callback) {
        const eventCallback = {
            event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.ENVIRONMENTS_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.ENVIRONMENTS_RESOURCE + default_1.Default.SAVE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subDeleteEnvironment(callback) {
        const eventCallback = {
            event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.ENVIRONMENTS_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.ENVIRONMENTS_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subUpdateChild(callback) {
        const eventCallback = {
            event_name: default_1.Default.CHILD_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.CHILDREN_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.CHILDREN_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subUpdateFamily(callback) {
        const eventCallback = {
            event_name: default_1.Default.FAMILY_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.FAMILIES_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.FAMILIES_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subUpdateEducator(callback) {
        const eventCallback = {
            event_name: default_1.Default.EDUCATOR_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.EDUCATORS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.EDUCATORS_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subUpdateHealthProfessional(callback) {
        const eventCallback = {
            event_name: default_1.Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.HEALTH_PROFESSIONALS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.HEALTH_PROFESSIONALS_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subUpdateApplication(callback) {
        const eventCallback = {
            event_name: default_1.Default.APPLICATION_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.APPLICATIONS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.APPLICATIONS_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subDeleteUser(callback) {
        const eventCallback = {
            event_name: default_1.Default.USER_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.USERS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.USERS_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    subDeleteInstitution(callback) {
        const eventCallback = {
            event_name: default_1.Default.INSTITUTION_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            handle: callback
        };
        return new Promise((resolve, reject) => {
            this.connection.subscribe(default_1.Default.INSTITUTIONS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.INSTITUTIONS_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback).then(result => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
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
