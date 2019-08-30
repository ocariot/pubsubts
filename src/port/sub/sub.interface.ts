export interface ISub {
    sub(routingKey: string, callback: (message: any) => void): Promise<void>
}
