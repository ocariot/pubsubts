import { IOptions } from './configuration.inteface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'
import { IEventHandler } from './event.handler.interface'

export interface IEventbusInterface {
    isConnected: boolean

    connect(host: string, port: number, username: string, password: string,
            options?: IOptions): Promise<boolean | OcariotPubSubException>

    close(): Promise<boolean | OcariotPubSubException>

    publish(exchangeName: string, exchangeType: string, message: any ): Promise<boolean | OcariotPubSubException>

    subscribe(exchangeName: string, queueName: string, routing_key: string,
              callback: IEventHandler<any>): Promise<boolean | OcariotPubSubException>

    receiveFromYourself(value: boolean): boolean

    loggerConnection(enabled: boolean, level?: string): boolean
}
