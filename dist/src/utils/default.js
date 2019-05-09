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
exports.Default = Default;
