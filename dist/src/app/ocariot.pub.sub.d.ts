/// <reference types="node" />
import { IOcariotPubInterface } from '../port/ocariot.pub.interface';
import { IOcariotSubInterface } from '../port/ocariot.sub.interface';
import { EventEmitter } from "events";
import { IOptions } from '../port/configuration.inteface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
export declare class OcariotPubSub extends EventEmitter implements IOcariotPubInterface, IOcariotSubInterface {
    private connection;
    connect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<boolean | OcariotPubSubException>;
    close(): Promise<boolean | OcariotPubSubException>;
    readonly isConnected: boolean;
    pub(exchangeName: string, routing_key: string, body: object): Promise<boolean | OcariotPubSubException>;
    pubSavePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>;
    pubUpdatePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>;
    pubDeletePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>;
    pubSaveSleep(sleep: any): Promise<boolean | OcariotPubSubException>;
    pubUpdateSleep(sleep: any): Promise<boolean | OcariotPubSubException>;
    pubDeleteSleep(sleep: any): Promise<boolean | OcariotPubSubException>;
    pubSaveEnvironment(environment: any): Promise<boolean | OcariotPubSubException>;
    pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException>;
    pubUpdateChild(child: any): Promise<boolean | OcariotPubSubException>;
    pubUpdateFamily(family: any): Promise<boolean | OcariotPubSubException>;
    pubUpdateEducator(educator: any): Promise<boolean | OcariotPubSubException>;
    pubUpdateHealthProfessional(healthprofessional: any): Promise<boolean | OcariotPubSubException>;
    pubUpdateApplication(application: any): Promise<boolean | OcariotPubSubException>;
    pubDeleteUser(user: any): Promise<boolean | OcariotPubSubException>;
    pubDeleteInstitution(institution: any): Promise<boolean | OcariotPubSubException>;
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
