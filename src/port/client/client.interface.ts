export interface IClient {
    getResource(name: string, exchangeName: string, params: any[], callback?: (err, result) => any): void | Promise<any>
}
