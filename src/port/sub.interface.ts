import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface ISubInterface {

    sub(exchange: string, queue: string, routing_key: string, callback: Function): boolean | OcariotPubSubException

}
