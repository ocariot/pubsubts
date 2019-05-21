import { ISubInterface } from './sub.interface';
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
export interface IOcariotSubInterface extends ISubInterface {
    subSavePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subUpdatePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subDeletePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subSaveSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subUpdateSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subDeleteSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subSaveEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subDeleteEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subUpdateChild(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subUpdateFamily(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subUpdateEducator(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subUpdateHealthProfessional(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subUpdateApplication(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subDeleteUser(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>;
    subDeleteInstitution(callback: (message: string) => void): Promise<boolean | OcariotPubSubException>;
}
