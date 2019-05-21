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
    pubSavePhysicalActivity(activity) {
        let message = {
            event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            physicalactivity: activity
        };
        return new Promise((resolve, reject) => {
            this.connection.publish(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.SAVE_ACTION, message).then((result) => {
                resolve(result);
            }).catch(err => {
                reject(new ocariotPubSub_exception_1.OcariotPubSubException(err));
            });
        });
    }
    pubUpdatePhysicalActivity(activity) {
        let message = {
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
        let message = {
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
        let message = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            sleep: sleep
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
        let message = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            sleep: sleep
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
        let message = {
            event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            sleep: sleep
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
        let message = {
            event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            environment: environment
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
        let message = {
            event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            environment: environment
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
        let message = {
            event_name: default_1.Default.CHILD_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            child: child
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
        let message = {
            event_name: default_1.Default.FAMILY_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            family: family
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
        let message = {
            event_name: default_1.Default.EDUCATOR_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            educator: educator
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
        let message = {
            event_name: default_1.Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            healthprofessional: healthprofessional
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
        let message = {
            event_name: default_1.Default.APPLICATION_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            application: application
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
        let message = {
            event_name: default_1.Default.USER_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            user: user
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
        let message = {
            event_name: default_1.Default.INSTITUTION_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
            timestamp: default_1.Default.getDataTimeUTC(),
            institution: institution
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
            let eventCallback = {
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
        try {
            let eventCallback = {
                event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.SAVE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subUpdatePhysicalActivity(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subDeletePhysicalActivity(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.PHYSICAL_ACTIVITIES_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subSaveSleep(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.SLEEP_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.SLEEP_RESOURCE + default_1.Default.SAVE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subUpdateSleep(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.SLEEP_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.SLEEP_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subDeleteSleep(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.SLEEP_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.SLEEP_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.SLEEP_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subSaveEnvironment(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.SAVE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.ENVIRONMENTS_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.ENVIRONMENTS_RESOURCE + default_1.Default.SAVE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subDeleteEnvironment(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.ENVIRONMENT_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.ENVIRONMENTS_RESOURCE, default_1.Default.OCARIOT_ACTIVITY_SERVICE, default_1.Default.ENVIRONMENTS_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subUpdateChild(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.CHILD_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.CHILDREN_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.CHILDREN_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subUpdateFamily(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.FAMILY_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.FAMILIES_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.FAMILIES_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subUpdateEducator(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.EDUCATOR_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.EDUCATORS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.EDUCATORS_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subUpdateHealthProfessional(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.HEALTH_PROFESSIONALS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.HEALTH_PROFESSIONALS_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subUpdateApplication(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.APPLICATION_RESOURCE_EVENT + default_1.Default.UPDATE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.APPLICATIONS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.APPLICATIONS_RESOURCE + default_1.Default.UPDATE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subDeleteUser(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.USER_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.USERS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.USERS_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    subDeleteInstitution(callback) {
        try {
            let eventCallback = {
                event_name: default_1.Default.INSTITUTION_RESOURCE_EVENT + default_1.Default.DELETE_EVENT,
                handle: callback
            };
            return Promise.resolve(this.connection.subscribe(default_1.Default.INSTITUTIONS_RESOURCE, default_1.Default.OCARIOT_ACCOUNT_SERVICE, default_1.Default.INSTITUTIONS_RESOURCE + default_1.Default.DELETE_ACTION, eventCallback));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
exports.OcariotPubSub = OcariotPubSub;
