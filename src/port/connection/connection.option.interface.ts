export interface IConnectionOption {
    rpcTimeout?: number
    receiveFromYourself?: boolean
    retries?: number
    interval?: number
    sslOptions?: ISSLOptions
}

export interface ISSLOptions {
    cert?: Buffer
    key?: Buffer
    passphrase?: string
    ca?: Buffer[]
}
