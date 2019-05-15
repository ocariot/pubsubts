export interface IConfiguration{
    vhost: string,
    host: string,
    port: Number,
    username: string,
    password: string,
    options: IOptions
}

export interface IOptions {
    retries: number; // number of retries, 0 is forever
    interval: number; // retry interval in ms
    ssl: {
        enabled: Boolean,
        ca?: Array<Buffer>
    };
}
