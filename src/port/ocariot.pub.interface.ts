import {IPubInterface} from './pub.interface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IOcariotPubInterface extends IPubInterface{

    pubSavePhysicalActivity(activity: object): boolean | OcariotPubSubException

    pubUpdatePhysicalActivity(activity: object): boolean | OcariotPubSubException

    pubDeletePhysicalActivity(activity: object): boolean | OcariotPubSubException

    pubSaveSleep(sleep: object): boolean | OcariotPubSubException

    pubUpdateSleep(sleep: object): boolean | OcariotPubSubException

    pubDeleteSleep(sleep: object): boolean | OcariotPubSubException

    pubSaveEnvironment(environment: object): boolean | OcariotPubSubException

    pubDeleteEnvironment(environment: object): boolean | OcariotPubSubException

}
