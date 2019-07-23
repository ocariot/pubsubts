export interface IServer {

    resource(sourceMicroservice: string, name: string, exchangeName: string, func: (...any) => any): void

}
