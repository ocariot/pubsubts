import { Connection } from 'amqp-ts';
import { IConnectionFactory } from './connection.factory.interface';
import { Options } from './configuration.inteface';
export declare class ConnectionFactoryRabbitMQ implements IConnectionFactory {
    private configuration;
    constructor(host: string, port: number, username: string, password: string, options?: Options);
    /**
     * Create instance of {@link Connection} Class belonging
     * to the amqp-ts library to connect to RabbitMQ.
     *
     * @param _retries Total attempts to be made until give up reconnecting
     * @param _interval Interval in milliseconds between each attempt
     * @return Promise<Connection>
     */
    createConnection(): Promise<Connection>;
}
