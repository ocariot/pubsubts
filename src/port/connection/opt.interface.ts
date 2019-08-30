import * as AmqpClient from 'amqp-client-node'

export interface IConnectionOptions extends AmqpClient.IConnectionOptions {
    rpcTimeout?: number
    receiveFromYourself?: boolean
}
