/// <reference types="node" />
export interface IConfiguration {
    vhost: string;
    host: string;
    port: Number;
    username: string;
    password: string;
    options: IOptions;
}
export interface IOptions {
    retries: number;
    interval: number;
    ssl: {
        enabled: Boolean;
        ca?: Array<Buffer>;
    };
}
