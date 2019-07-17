import { OcariotPubSubException } from '../../exception/ocariotPubSub.exception'

export interface IPub {

    pub(eventName: string, exchange: string, routingKey: string,
        body: any): Promise<boolean | OcariotPubSubException>

}
