export interface IOpt {
    retries: number // number of retries, 0 is forever
    interval: number // retry interval in ms
    ssl: {
        enabled: boolean,
        ca: string
    }
    rcpTimeout: number
}
