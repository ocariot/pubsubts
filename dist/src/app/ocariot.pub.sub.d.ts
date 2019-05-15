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
    pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException>;
    pubDeletePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException>;
    pubDeleteSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException>;
    pubSaveEnvironment(environment: IMessage): Promise<boolean | OcariotPubSubException>;
    pubSavePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException>;
    pubSaveSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException>;
    pubUpdatePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException>;
    pubUpdateSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException>;
    sub(exchangeName: string, queueName: string, routing_key: string, callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subDeleteEnvironment(callback: Function): Promise<boolean | OcariotPubSubException>;
    subDeletePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>;
    subDeleteSleep(callback: Function): Promise<boolean | OcariotPubSubException>;
    subSaveEnvironment(callback: Function): Promise<boolean | OcariotPubSubException>;
    subSavePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>;
    subSaveSleep(callback: Function): Promise<boolean | OcariotPubSubException>;
    subUpdatePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>;
    subUpdateSleep(callback: Function): Promise<boolean | OcariotPubSubException>;
}
