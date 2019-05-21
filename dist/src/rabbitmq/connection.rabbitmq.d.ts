import { Connection } from 'amqp-ts';
import { IConnectionEventBus } from '../port/connection.event.bus.interface';
import { IOptions } from "../port/configuration.inteface";
import { IEventHandler } from '../port/event.handler.interface';
/**
 * Implementation of the interface that provides conn with RabbitMQ.
 * To implement the RabbitMQ abstraction the amqp-ts library was used.
 *
 * @see {@link https://github.com/abreits/amqp-ts} for more details.
 * @implements {IConnectionEventBus}
 */
export declare class ConnectionRabbitMQ implements IConnectionEventBus {
    private event_handlers;
    private consumerInitialized;
    private _connection?;
    readonly isConnected: boolean;
    readonly conn: Connection | undefined;
    /**
     * Routine to connect to RabbitMQ.
     * When there is no connection to RabbitMQ, new attempts
     * are made to connect according to the parameter {@link _options}
     * which sets the total number of retries and the delay
     *
     * @return Promise<void>
     * @param host
     * @param port
     * @param username
     * @param password
     * @param options
     */
    tryConnect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<Connection>;
    closeConnection(): boolean | undefined;
    sendMessage(exchangeName: string, topicKey: string, message: any): Promise<boolean>;
    receiveMessage(exchangeName: string, queueName: string, topicKey: string, callback: IEventHandler<any>): Promise<boolean>;
}
