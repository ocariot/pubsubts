/// <reference types="node" />
import { Configuration } from "./rabbitmq/configuration.inteface";
import EventEmitter = NodeJS.EventEmitter;
export declare class ManagerConnection extends EventEmitter {
    private pubconection;
    private subconection;
    constructor(configuration: Configuration);
    connect(configuration: Configuration): boolean;
    close(): Boolean;
}
