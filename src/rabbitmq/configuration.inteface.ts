export interface Configuration{
    vhost: string,
    host: string,
    port: Number,
    username: string,
    password: string,
    options: Options
}

export interface Options {
    retries: number; // number of retries, 0 is forever
    interval: number; // retry interval in ms
    ssl: {
        enabled: Boolean,
        ca?: Array<Buffer>
    };
}
