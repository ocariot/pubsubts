import { ISubInterface } from './sub.interface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
export interface IOcariotSubInterface extends ISubInterface {
    subSavePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>;
    subUpdatePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>;
    subDeletePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>;
    subSaveSleep(callback: Function): Promise<boolean | OcariotPubSubException>;
    subUpdateSleep(callback: Function): Promise<boolean | OcariotPubSubException>;
    subDeleteSleep(callback: Function): Promise<boolean | OcariotPubSubException>;
    subSaveEnvironment(callback: Function): Promise<boolean | OcariotPubSubException>;
    subDeleteEnvironment(callback: Function): Promise<boolean | OcariotPubSubException>;
}
