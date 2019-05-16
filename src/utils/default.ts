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

    //RESOURCES_CAMEL_CASE - Event Name
    public static readonly PHYSICAL_ACTIVITY_RESOURCE_EVENT: string = 'PhysicalActivity'
    public static readonly SLEEP_RESOURCE_EVENT: string = 'Sleep'
    public static readonly ENVIRONMENT_RESOURCE_EVENT: string = 'Environment'
    public static readonly CHILD_RESOURCE_EVENT: string = 'Child'
    public static readonly FAMILY_RESOURCE_EVENT: string = 'Family'
    public static readonly EDUCATOR_RESOURCE_EVENT: string = 'Educator'
    public static readonly HEALTH_PROFESSIONAL_RESOURCE_EVENT: string = 'HealthProfessional'
    public static readonly APPLICATION_RESOURCE_EVENT: string = 'Application'
    public static readonly USER_RESOURCE_EVENT: string = 'User'
    public static readonly INSTITUTION_RESOURCE_EVENT: string = 'Institution'

    //RESOURCES_PLURAL - Exchange Name
    public static readonly PHYSICAL_ACTIVITIES_RESOURCE: string = 'physicalactivities'
    public static readonly SLEEP_RESOURCE: string = 'sleep'
    public static readonly ENVIRONMENTS_RESOURCE: string = 'environments'
    public static readonly CHILDREN_RESOURCE: string = 'children'
    public static readonly FAMILIES_RESOURCE: string = 'families'
    public static readonly EDUCATORS_RESOURCE: string = 'educators'
    public static readonly HEALTH_PROFESSIONALS_RESOURCE: string = 'healthprofessionals'
    public static readonly APPLICATIONS_RESOURCE: string = 'applications'
    public static readonly USERS_RESOURCE: string = 'users'
    public static readonly INSTITUTIONS_RESOURCE: string = 'institutions'

    //ACTIONS
    public static readonly DELETE_ACTION: string = '.delete'
    public static readonly SAVE_ACTION: string = '.save'
    public static readonly UPDATE_ACTION: string = '.update'

    //EVENTS
    public static readonly DELETE_EVENT: string = 'DeleteEvent'
    public static readonly SAVE_EVENT: string = 'SaveEvent'
    public static readonly UPDATE_EVENT: string = 'UpdateEvent'


    public static getDataTimeUTC(): string{
        return new Date(new Date(Date.now()).toISOString()).getTime().toString();
    }

}
