export interface IServer {

    resource(sourceMicroservice: string, exchangeName: string, name: string, func: (...any) => any): void

}
