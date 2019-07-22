export interface IConnOpt {
    retries?: number // number of retries, 0 is forever
    interval?: number // retry interval in ms
    ssl?: {
        enabled: boolean,
        ca: string
    }
}

export const defaultConnOpt: IConnOpt = {
    retries: 0,
    interval: 1000,
    ssl: {
        enabled: false,
        ca: ''
    }
}
