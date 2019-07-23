import { IConnConfiguration, IConnOptions } from 'pubsub'

export const defaultConnConfig: IConnConfiguration = {
    host: '127.0.0.1',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: 'ocariot'
}

export const defaultConnOpt: IConnOptions = {
    retries: 0,
    interval: 1000,
    ssl: {
        enabled: false,
        ca: ''
    },
    rcp_timeout: 5000
}
