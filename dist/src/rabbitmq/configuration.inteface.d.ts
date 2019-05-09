/// <reference types="node" />
export interface Configuration {
    vhost: string;
    host: string;
    port: Number;
    username: string;
    password: string;
    options: Options;
}
export interface Options {
    retries: number;
    interval: number;
    ssl: {
        enabled: Boolean;
        ca?: Array<Buffer>;
    };
}
