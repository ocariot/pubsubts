import { OcariotPubSubException } from '../../exception/ocariotPubSub.exception'

export interface ISub {

    sub(exchange: string, routingKey: string,
        callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    receiveFromYourself(value: boolean): boolean

}
