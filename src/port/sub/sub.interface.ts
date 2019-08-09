export interface ISub {

    sub(targetMicroservice: string, routingKey: string,
        callback: (message: any) => void): Promise<void>

}
