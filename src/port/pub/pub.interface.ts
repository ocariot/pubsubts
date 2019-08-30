export interface IPub {
    pub(routingKey: string, body: any): Promise<void>
}
