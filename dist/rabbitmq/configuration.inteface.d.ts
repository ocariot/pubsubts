/// <reference types="node" />
import { Connection } from "amqp-ts";
export interface Configuration {
    vhost: string;
    host: string;
    port: Number;
    username: string;
    password: string;
    options: Connection.ReconnectStrategy;
    ssl: Ssl;
}
export interface Ssl {
    enabled: Boolean;
    ca?: Array<Buffer>;
}
