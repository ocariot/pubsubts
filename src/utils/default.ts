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

    //RESOURCES_CAMEL_CASE
    public static readonly PHYSICAL_ACTIVITIES_RESOURCE_EVENT: string = 'PhysicalActivity'
    public static readonly SLEEP_RESOURCE_EVENT: string = 'Sleep'
    public static readonly ENVIRONMENTS_RESOURCE_EVENT: string = 'Environment'

    //RESOURCES_PLURAL
    public static readonly PHYSICAL_ACTIVITIES_RESOURCE: string = 'physicalactivities'
    public static readonly SLEEP_RESOURCE: string = 'sleep'
    public static readonly ENVIRONMENTS_RESOURCE: string = 'environments'

    //ACTIONS
    public static readonly DELETE_ACTION: string = '.delete'
    public static readonly SAVE_ACTION: string = '.save'
    public static readonly UPDATE_ACTION: string = '.update'

    //EVENTS
    public static readonly DELETE_EVENT: string = 'DeleteEvent'
    public static readonly SAVE_EVENT: string = 'SaveEvent'
    public static readonly UPDATE_EVENT: string = 'UpdateEvent'


    public static readonly RESOURCE_PHYSICAL_ACTIVITIES: string = 'physicalactivity'
    public static readonly RESOURCE_SLEEP: string = 'sleep'
    public static readonly RESOURCE_ENVIRONMENTSS: string = 'environment'

}
