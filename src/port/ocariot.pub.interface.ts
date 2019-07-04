import {IPubInterface} from './pub.interface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IOcariotPubInterface extends IPubInterface {

    pubSavePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>

    pubUpdatePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>

    pubDeletePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>

    pubSaveSleep(sleep: any): Promise<boolean | OcariotPubSubException>

    pubUpdateSleep(sleep: any): Promise<boolean | OcariotPubSubException>

    pubDeleteSleep(sleep: any): Promise<boolean | OcariotPubSubException>

    pubSaveEnvironment(environment: any): Promise<boolean | OcariotPubSubException>

    pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException>

    pubUpdateChild(child: any): Promise<boolean | OcariotPubSubException>

    pubUpdateFamily(family: any): Promise<boolean | OcariotPubSubException>

    pubUpdateEducator(educator: any): Promise<boolean | OcariotPubSubException>

    pubUpdateHealthProfessional(healthprofessional: any): Promise<boolean | OcariotPubSubException>

    pubUpdateApplication(application: any): Promise<boolean | OcariotPubSubException>

    pubDeleteUser(user: any): Promise<boolean | OcariotPubSubException>

    pubDeleteInstitution(institution: any): Promise<boolean | OcariotPubSubException>
}
