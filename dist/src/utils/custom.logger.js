"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
class CustomLogger {
    constructor() {
        this._options = {};
        this.initOptions(); // initialize options logger
        this._logger = this.internalCreateLogger();
    }
    get logger() {
        return this._logger;
    }
    internalCreateLogger() {
        return winston_1.createLogger({
            level: 'silly',
            silent: false,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: new winston_1.transports.Console(this._options),
            exitOnError: false
        });
    }
    initOptions() {
        this._options = {
            level: 'debug',
            silent: true,
            handleExceptions: true,
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.splat(), winston_1.format.timestamp(), winston_1.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`))
        };
    }
    addTransport(transport) {
        return this._logger.add(transport);
    }
    error(message) {
        this._logger.error(message);
    }
    warn(message) {
        this._logger.warn(message);
    }
    info(message) {
        this._logger.info(message);
    }
    verbose(message) {
        this._logger.verbose(message);
    }
    debug(message) {
        this._logger.debug(message);
    }
    silly(message) {
        this._logger.silly(message);
    }
    changeLoggerConfiguration(enabled, level) {
        this._options.silent = enabled;
        if (level)
            this._options.level = level;
        this._logger.clear();
        this._logger.add(new winston_1.transports.Console(this._options));
        return (1 == this._logger.transports.length) ? true : false;
    }
}
exports.CustomLogger = CustomLogger;
