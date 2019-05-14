import {IOptions} from "./configuration.inteface"
import { Connection } from 'amqp-ts'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IConnectionEventBus {
    isConnected: boolean

    conn?: any

    tryConnect(host : string, port : number, username : string, password : string, options ?: IOptions): Promise<Connection>

    closeConnection(): boolean  | undefined

    sendMessage(exchangeName: string, topicKey: string, message: any): Promise<boolean>

    receiveMessage(exchangeName: string, queueName: string, topicKey: string, callback: (message:any) => void): Promise<boolean>
}
