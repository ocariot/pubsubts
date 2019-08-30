export interface IServer {
    provide(name: string, func: (...any) => any): void
}
