export interface IPub {

    pub(eventName: string, exchange: string, routingKey: string,
        body: any): Promise<void>

}
