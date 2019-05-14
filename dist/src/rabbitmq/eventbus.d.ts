/// <reference types="node" />
import { IOptions } from "../port/configuration.inteface";
import { EventEmitter } from 'events';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
import { IEventbusInterface } from '../port/eventbus.interface';
export declare class EventBus extends EventEmitter implements IEventbusInterface {
    private pubconnection;
    private subconnection;
    connect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<boolean | OcariotPubSubException>;
    close(): Promise<boolean | OcariotPubSubException>;
    readonly isConnected: boolean;
    publish(exchangeName: string, topicKey: string, message: any): Promise<boolean | OcariotPubSubException>;
    subscribe(exchangeName: string, queueName: string, routing_key: string, callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
}
