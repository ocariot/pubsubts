/// <reference types="node" />
import { EventBus } from '../rabbitmq/eventbus';
import { EventEmitter } from "events";
import { IOptions } from '../port/configuration.inteface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
export declare class OcariotPubsub extends EventEmitter {
    connection: EventBus;
    connect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<boolean | OcariotPubSubException>;
    close(): boolean;
    readonly isConnected: boolean;
}
