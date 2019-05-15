import { IPubInterface } from './pub.interface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
import { IMessage } from './message.interface';
export interface IOcariotPubInterface extends IPubInterface {
    pubSavePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException>;
    pubUpdatePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException>;
    pubDeletePhysicalActivity(activity: IMessage): Promise<boolean | OcariotPubSubException>;
    pubSaveSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException>;
    pubUpdateSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException>;
    pubDeleteSleep(sleep: IMessage): Promise<boolean | OcariotPubSubException>;
    pubSaveEnvironment(environment: IMessage): Promise<boolean | OcariotPubSubException>;
    pubDeleteEnvironment(environment: IMessage): Promise<boolean | OcariotPubSubException>;
}
