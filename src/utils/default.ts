/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export abstract class Default {
    // RabbitMQ
    public static readonly RABBITMQ_VHOST: string = 'ocariot'
    public static readonly RABBITMQ_HOST: string = 'localhost'
    public static readonly RABBITMQ_PORT: number = 5671
    public static readonly RABBITMQ_USERNAME: string = 'guest'
    public static readonly RABBITMQ_PASSWORD: string = 'guest'

    public static readonly OCARIOT_ACCOUNT_SERVICE: string = 'ocariot-account-service'
    public static readonly OCARIOT_ACTIVITY_SERVICE: string = 'ocariot-activity-service'


}
