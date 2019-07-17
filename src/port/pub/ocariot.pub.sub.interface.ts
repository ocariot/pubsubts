import { IOcariotPub } from '../ocariot.pub.interface'
import { IOcariotSub } from '../sub/ocariot.sub.interface'

export interface IOcariotPubSub extends IOcariotPub, IOcariotSub {

    logger(enabled: boolean, level?: string): boolean

}
