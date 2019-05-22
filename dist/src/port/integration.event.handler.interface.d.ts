export interface IIntegrationEventHandler<T> {
    event_name: string;
    handle(event: T): void;
}
