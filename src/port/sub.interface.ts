import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface ISubInterface {

    sub(exchange: string, queue: string, routingKey: string, eventName: string,
        callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

}
