import {Options} from "./configuration.inteface"
import { Connection } from 'amqp-ts'

export interface IConnectionEventBus {
    isConnected: boolean

    conn?: any

    tryConnect(host : string, port : number, username : string, password : string, options ?: Options): Promise<Connection>

    closeConnection(): boolean  | undefined
}
