import { IOptions } from "./configuration.inteface";
import { Connection } from 'amqp-ts';
export interface IConnectionEventBus {
    isConnected: boolean;
    conn?: any;
    tryConnect(host: string, port: number, username: string, password: string, options?: IOptions): Promise<Connection>;
    closeConnection(): boolean | undefined;
}
