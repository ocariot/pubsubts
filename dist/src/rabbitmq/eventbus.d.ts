import { IOptions } from "../port/configuration.inteface";
import { OcariotPubSubException } from '../exception/ocariotPubSub.exception';
import { IEventbusInterface } from '../port/eventbus.interface';
import { IEventHandler } from '../port/event.handler.interface';
export declare class EventBus implements IEventbusInterface {
    private pubconnection;
    private subconnection;
    private event_handlers;
    connect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<boolean | OcariotPubSubException>;
    close(): Promise<boolean | OcariotPubSubException>;
    readonly isConnected: boolean;
    publish(exchangeName: string, topicKey: string, message: any): Promise<boolean | OcariotPubSubException>;
    subscribe(exchangeName: string, queueName: string, routing_key: string, callback: IEventHandler<any>): Promise<boolean | OcariotPubSubException>;
}
