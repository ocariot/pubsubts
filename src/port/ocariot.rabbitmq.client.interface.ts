import { IOcariotPub } from './pub/ocariot.pub.interface'
import { IOcariotSub } from './sub/ocariot.sub.interface'
import { IOcariotRpcClient } from './rpc/ocariot.rpc.client.interface'
import { IOcariotRpcServer } from './rpc/ocariot.rpc.server.interface'

export interface IOcariotRabbitMQClient extends IOcariotPub, IOcariotSub, IOcariotRpcClient, IOcariotRpcServer {
    close(): Promise<void>

    logger(level: string, moduleName?: string): void

    on(event: string | symbol, listener: (...args: any[]) => void): void
}
