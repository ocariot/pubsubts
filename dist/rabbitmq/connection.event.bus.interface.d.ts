import { Configuration } from "./configuration.inteface";
export interface IConnectionEventBus {
    isConnected: boolean;
    conn?: any;
    tryConnect(configuration: Configuration): Promise<void>;
    closeConnection(): boolean | undefined;
}
