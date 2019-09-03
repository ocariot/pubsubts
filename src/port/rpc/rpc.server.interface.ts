export interface IRpcServer {
    provide(name: string, func: (...any) => any): void
}
