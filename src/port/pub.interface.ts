import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IPubInterface {

    pub(exchange: string, routing_key: string, body: object): Promise<boolean | OcariotPubSubException>

}
