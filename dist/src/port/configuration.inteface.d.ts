/// <reference types="node" />
export interface IConfiguration {
    vhost: string;
    host: string;
    port: number;
    username: string;
    password: string;
    options: IOptions;
}
export interface IOptions {
    retries: number;
    interval: number;
    ssl: {
        enabled: boolean;
        ca?: Array<Buffer>;
    };
}
