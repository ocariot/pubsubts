export interface IEventHandler<T> {
    event_name: string;
    handle(event: T): void;
}
