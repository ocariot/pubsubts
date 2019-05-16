import {ISubInterface} from './sub.interface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IOcariotSubInterface extends ISubInterface{

    subSavePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>

    subUpdatePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>

    subDeletePhysicalActivity(callback: Function): Promise<boolean | OcariotPubSubException>

    subSaveSleep(callback: Function): Promise<boolean | OcariotPubSubException>

    subUpdateSleep(callback: Function): Promise<boolean | OcariotPubSubException>

    subDeleteSleep(callback: Function): Promise<boolean | OcariotPubSubException>

    subSaveEnvironment(callback: Function): Promise<boolean | OcariotPubSubException>

    subDeleteEnvironment(callback: Function): Promise<boolean | OcariotPubSubException>

    subUpdateChild(callback): Promise<boolean | OcariotPubSubException>

    subUpdateFamily(callback): Promise<boolean | OcariotPubSubException>

    subUpdateEducator(callback): Promise<boolean | OcariotPubSubException>

    subUpdateHealthProfessional(callback): Promise<boolean | OcariotPubSubException>

    subUpdateApplication(callback): Promise<boolean | OcariotPubSubException>

    subDeleteUser(callback): Promise<boolean | OcariotPubSubException>

    subDeleteInstitution(callback): Promise<boolean | OcariotPubSubException>

}
