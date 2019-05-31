import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IPubInterface {

    pub(eventName: string, exchange: string, routingKey: string,
        body: any): Promise<boolean | OcariotPubSubException>

}
