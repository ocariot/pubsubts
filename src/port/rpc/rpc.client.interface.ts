export interface IRpcClient {
    getResource(name: string, params: any[], callback?: (err, result) => any): void | Promise<any>
}
