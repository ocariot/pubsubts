export interface IMessage {
    event_name: string,
    timestamp: string
}

export interface IMessagePhysicalActivity extends IMessage{
    physicalactivity: object
}

export interface IMessageSleep extends IMessage{
    sleep: object
}

export interface IMessageEnvironment extends IMessage{
    environment: object
}



