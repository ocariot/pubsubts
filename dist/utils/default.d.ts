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
}
