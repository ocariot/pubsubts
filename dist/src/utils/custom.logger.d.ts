import { Logger } from 'winston';
export declare class CustomLogger implements ILogger {
    private readonly _logger;
    private _options;
    constructor();
    readonly logger: Logger;
    private internalCreateLogger;
    private initOptions;
    addTransport(transport: any): Logger;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    verbose(message: string): void;
    debug(message: string): void;
    silly(message: string): void;
    changeLoggerConfiguration(enabled: boolean, level?: string): boolean;
}
/**
 * Logger interface.
 * logging levels are prioritized from 0 to 5 (highest to lowest):
 *   error: 0,
 *   warn: 1,
 *   info: 2,
 *   verbose: 3,
 *   debug: 4,
 *   silly: 5
 *
 * @see {@link https://github.com/winstonjs/winston#using-logging-levels} for further information.
 */
export interface ILogger {
    logger: Logger;
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    verbose(message: string): void;
    debug(message: string): void;
    silly(message: string): void;
    addTransport(transport: any): Logger;
    changeLoggerConfiguration(enabled: boolean, level?: string): boolean;
}
