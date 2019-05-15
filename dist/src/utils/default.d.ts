/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export declare abstract class Default {
    static readonly RABBITMQ_VHOST: string;
    static readonly RABBITMQ_HOST: string;
    static readonly RABBITMQ_PORT: number;
    static readonly RABBITMQ_USERNAME: string;
    static readonly RABBITMQ_PASSWORD: string;
    static readonly OCARIOT_ACCOUNT_SERVICE: string;
    static readonly OCARIOT_ACTIVITY_SERVICE: string;
    static readonly PHYSICAL_ACTIVITIES_RESOURCE_EVENT: string;
    static readonly SLEEP_RESOURCE_EVENT: string;
    static readonly ENVIRONMENTS_RESOURCE_EVENT: string;
    static readonly PHYSICAL_ACTIVITIES_RESOURCE: string;
    static readonly SLEEP_RESOURCE: string;
    static readonly ENVIRONMENTS_RESOURCE: string;
    static readonly DELETE_ACTION: string;
    static readonly SAVE_ACTION: string;
    static readonly UPDATE_ACTION: string;
    static readonly DELETE_EVENT: string;
    static readonly SAVE_EVENT: string;
    static readonly UPDATE_EVENT: string;
    static readonly RESOURCE_PHYSICAL_ACTIVITIES: string;
    static readonly RESOURCE_SLEEP: string;
    static readonly RESOURCE_ENVIRONMENTSS: string;
}
