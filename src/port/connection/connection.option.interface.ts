export interface IConnectionOption {
    retries?: number
    interval?: number
    rpcTimeout?: number
    receiveFromYourself?: boolean
    sslOptions?: ISSLOptions
}

export interface ISSLOptions {
    cert?: Buffer
    key?: Buffer
    passphrase?: string
    ca?: Buffer[]
}
