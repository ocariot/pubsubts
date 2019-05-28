import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IPubInterface {

    pub(eventName: string, exchange: string, routing_key: string,
        body: any): Promise<boolean | OcariotPubSubException>

}
