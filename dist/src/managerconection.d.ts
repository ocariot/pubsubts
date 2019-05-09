/// <reference types="node" />
import { Options } from "./rabbitmq/configuration.inteface";
import { EventEmitter } from 'events';
import { OcariotPubSubException } from './exception/ocariotPubSub.exception';
export declare class ManagerConnection extends EventEmitter {
    private pubconection;
    private subconection;
    connect(host: string, port: number, username: string, password: string, options?: Options): Promise<boolean | OcariotPubSubException>;
    close(): boolean;
    readonly isConnected: boolean;
}
