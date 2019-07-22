export interface IConnConfig {
    host: string,
    port: number,
    username: string,
    password: string,
}

export const defaultConnConfig: IConnConfig = {
    host: '127.0.0.1',
    port: 5672,
    username: 'guest',
    password: 'guest'
}
