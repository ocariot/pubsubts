import { Connection } from 'amqp-ts';
import { IConnectionEventBus } from './connection.event.bus.interface';
import { Configuration } from "./configuration.inteface";
/**
 * Implementation of the interface that provides conn with RabbitMQ.
 * To implement the RabbitMQ abstraction the amqp-ts library was used.
 *
 * @see {@link https://github.com/abreits/amqp-ts} for more details.
 * @implements {IConnectionEventBus}
 */
export declare class ConnectionRabbitMQ implements IConnectionEventBus {
    private _connection?;
    readonly isConnected: boolean;
    readonly conn: Connection | undefined;
    /**
     * Routine to connect to RabbitMQ.
     * When there is no connection to RabbitMQ, new attempts
     * are made to connect according to the parameter {@link _options}
     * which sets the total number of retries and the delay
     *
     * @param retries Total attempts to be made until give up reconnecting
     * @param interval Interval in milliseconds between each attempt
     * @return Promise<void>
     */
    tryConnect(configuration: Configuration): Promise<void>;
    closeConnection(): boolean | undefined;
}
