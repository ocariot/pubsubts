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

    public static getDataTimeUTC(): string{
        return new Date(new Date(Date.now()).toISOString()).getTime().toString()
    }

}
