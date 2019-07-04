import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface ISubInterface {

    sub(exchange: string, queue: string, routingKey: string,
        callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

}
