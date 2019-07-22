export interface IPub {

    pub(exchange: string, routingKey: string,
        body: any): Promise<void>

}
