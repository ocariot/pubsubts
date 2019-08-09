import { IOcariotPub } from './pub/ocariot.pub.interface'
import { IOcariotSub } from './sub/ocariot.sub.interface'
import { IOcariotClient } from './client/ocariot.client.interface'
import { IOcariotServer } from './server/ocariot.server.interface'

export interface IOcariotPubSub extends IOcariotPub, IOcariotSub, IOcariotClient, IOcariotServer {

    close(): Promise<void>

    dispose(): Promise<void>

    logger(level: string): void

}
