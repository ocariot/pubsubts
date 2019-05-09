import { IOptions } from './configuration.inteface'
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception'

export interface IEventbusInterface {
    isConnected : boolean

    connect(host : string, port : number, username : string, password : string, options ?: IOptions): Promise<boolean | OcariotPubSubException>

    close():boolean

    publish(): boolean

    subscribe(): boolean
}
