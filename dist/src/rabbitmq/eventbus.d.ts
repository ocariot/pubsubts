/// <reference types="node" />
import { IOptions } from "../port/configuration.inteface";
import { EventEmitter } from 'events';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
import { IEventbusInterface } from '../port/eventbus.interface';
export declare class EventBus extends EventEmitter implements IEventbusInterface {
    private pubconection;
    private subconection;
    connect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<boolean | OcariotPubSubException>;
    close(): boolean;
    readonly isConnected: boolean;
    publish(): boolean;
    subscribe(): boolean;
}
