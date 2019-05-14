/// <reference types="node" />
import { IOcariotPubInterface } from '../port/ocariot.pub.interface';
import { IOcariotSubInterface } from '../port/ocariot.sub.interface';
import { EventEmitter } from "events";
import { IOptions } from '../port/configuration.inteface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
import { IMessage } from '../port/message.interface';
export declare class OcariotPubSub extends EventEmitter implements IOcariotPubInterface, IOcariotSubInterface {
    private connection;
    connect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<boolean | OcariotPubSubException>;
    close(): Promise<boolean | OcariotPubSubException>;
    readonly isConnected: boolean;
    pub(exchangeName: string, routing_key: string, body: object): Promise<boolean | OcariotPubSubException>;
    pubDeleteEnvironment(environment: any): boolean | OcariotPubSubException;
    pubDeletePhysicalActivity(activity: IMessage): boolean | OcariotPubSubException;
    pubDeleteSleep(sleep: IMessage): boolean | OcariotPubSubException;
    pubSaveEnvironment(environment: IMessage): boolean | OcariotPubSubException;
    pubSavePhysicalActivity(activity: IMessage): boolean | OcariotPubSubException;
    pubSaveSleep(sleep: IMessage): boolean | OcariotPubSubException;
    pubUpdatePhysicalActivity(activity: IMessage): boolean | OcariotPubSubException;
    pubUpdateSleep(sleep: IMessage): boolean | OcariotPubSubException;
    sub(exchangeName: string, queueName: string, routing_key: string, callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subDeleteEnvironment(callback: Function): boolean | OcariotPubSubException;
    subDeletePhysicalActivity(callback: Function): boolean | OcariotPubSubException;
    subDeleteSleep(callback: Function): boolean | OcariotPubSubException;
    subSaveEnvironment(callback: Function): boolean | OcariotPubSubException;
    subSavePhysicalActivity(callback: Function): boolean | OcariotPubSubException;
    subSaveSleep(callback: Function): boolean | OcariotPubSubException;
    subUpdatePhysicalActivity(callback: Function): boolean | OcariotPubSubException;
    subUpdateSleep(callback: Function): boolean | OcariotPubSubException;
}
