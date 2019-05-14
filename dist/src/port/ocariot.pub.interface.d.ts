import { IPubInterface } from './pub.interface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
import { IMessage } from './message.interface';
export interface IOcariotPubInterface extends IPubInterface {
    pubSavePhysicalActivity(activity: IMessage): boolean | OcariotPubSubException;
    pubUpdatePhysicalActivity(activity: IMessage): boolean | OcariotPubSubException;
    pubDeletePhysicalActivity(activity: IMessage): boolean | OcariotPubSubException;
    pubSaveSleep(sleep: IMessage): boolean | OcariotPubSubException;
    pubUpdateSleep(sleep: IMessage): boolean | OcariotPubSubException;
    pubDeleteSleep(sleep: IMessage): boolean | OcariotPubSubException;
    pubSaveEnvironment(environment: IMessage): boolean | OcariotPubSubException;
    pubDeleteEnvironment(environment: IMessage): boolean | OcariotPubSubException;
}
