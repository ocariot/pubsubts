import { ISubInterface } from './sub.interface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
export interface IOcariotSubInterface extends ISubInterface {
    subSavePhysicalActivity(callback: Function): boolean | OcariotPubSubException;
    subUpdatePhysicalActivity(callback: Function): boolean | OcariotPubSubException;
    subDeletePhysicalActivity(callback: Function): boolean | OcariotPubSubException;
    subSaveSleep(callback: Function): boolean | OcariotPubSubException;
    subUpdateSleep(callback: Function): boolean | OcariotPubSubException;
    subDeleteSleep(callback: Function): boolean | OcariotPubSubException;
    subSaveEnvironment(callback: Function): boolean | OcariotPubSubException;
    subDeleteEnvironment(callback: Function): boolean | OcariotPubSubException;
}
