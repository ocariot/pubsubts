"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
class Default {
}
// RabbitMQ
Default.RABBITMQ_VHOST = 'ocariot';
Default.RABBITMQ_HOST = 'localhost';
Default.RABBITMQ_PORT = 5671;
Default.RABBITMQ_USERNAME = 'guest';
Default.RABBITMQ_PASSWORD = 'guest';
Default.OCARIOT_ACCOUNT_SERVICE = 'ocariot-account-service';
Default.OCARIOT_ACTIVITY_SERVICE = 'ocariot-activity-service';
//RESOURCES_CAMEL_CASE
Default.PHYSICAL_ACTIVITIES_RESOURCE_EVENT = 'PhysicalActivity';
Default.SLEEP_RESOURCE_EVENT = 'Sleep';
Default.ENVIRONMENTS_RESOURCE_EVENT = 'Environment';
//RESOURCES_PLURAL
Default.PHYSICAL_ACTIVITIES_RESOURCE = 'physicalactivities';
Default.SLEEP_RESOURCE = 'sleep';
Default.ENVIRONMENTS_RESOURCE = 'environments';
//ACTIONS
Default.DELETE_ACTION = '.delete';
Default.SAVE_ACTION = '.save';
Default.UPDATE_ACTION = '.update';
//EVENTS
Default.DELETE_EVENT = 'DeleteEvent';
Default.SAVE_EVENT = 'SaveEvent';
Default.UPDATE_EVENT = 'UpdateEvent';
Default.RESOURCE_PHYSICAL_ACTIVITIES = 'physicalactivity';
Default.RESOURCE_SLEEP = 'sleep';
Default.RESOURCE_ENVIRONMENTSS = 'environment';
exports.Default = Default;
