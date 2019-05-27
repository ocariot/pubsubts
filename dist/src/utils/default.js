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
    static getDataTimeUTC() {
        return new Date(new Date(Date.now()).toISOString()).getTime().toString();
    }
}
// RabbitMQ
Default.RABBITMQ_VHOST = 'ocariot';
Default.RABBITMQ_HOST = 'localhost';
Default.RABBITMQ_PORT = 5671;
Default.RABBITMQ_USERNAME = 'guest';
Default.RABBITMQ_PASSWORD = 'guest';
Default.OCARIOT_ACTIVITY_SERVICE = 'ocariot-activity-service';
Default.OCARIOT_ACCOUNT_SERVICE = 'ocariot-account-service';
// RESOURCES_CAMEL_CASE - Event Name
Default.PHYSICAL_ACTIVITY_RESOURCE_EVENT = 'PhysicalActivity';
Default.SLEEP_RESOURCE_EVENT = 'Sleep';
Default.ENVIRONMENT_RESOURCE_EVENT = 'Environment';
Default.CHILD_RESOURCE_EVENT = 'Child';
Default.FAMILY_RESOURCE_EVENT = 'Family';
Default.EDUCATOR_RESOURCE_EVENT = 'Educator';
Default.HEALTH_PROFESSIONAL_RESOURCE_EVENT = 'HealthProfessional';
Default.APPLICATION_RESOURCE_EVENT = 'Application';
Default.USER_RESOURCE_EVENT = 'User';
Default.INSTITUTION_RESOURCE_EVENT = 'Institution';
// RESOURCES_PLURAL - Exchange Name
Default.PHYSICAL_ACTIVITIES_RESOURCE = 'physicalactivities';
Default.SLEEP_RESOURCE = 'sleep';
Default.ENVIRONMENTS_RESOURCE = 'environments';
Default.CHILDREN_RESOURCE = 'children';
Default.FAMILIES_RESOURCE = 'families';
Default.EDUCATORS_RESOURCE = 'educators';
Default.HEALTH_PROFESSIONALS_RESOURCE = 'healthprofessionals';
Default.APPLICATIONS_RESOURCE = 'applications';
Default.USERS_RESOURCE = 'users';
Default.INSTITUTIONS_RESOURCE = 'institutions';
// ACTIONS
Default.DELETE_ACTION = '.delete';
Default.SAVE_ACTION = '.save';
Default.UPDATE_ACTION = '.update';
// EVENTS
Default.DELETE_EVENT = 'DeleteEvent';
Default.SAVE_EVENT = 'SaveEvent';
Default.UPDATE_EVENT = 'UpdateEvent';
exports.Default = Default;
