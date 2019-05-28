export interface IMessage {
    event_name: string;
    timestamp: string;
}
export interface IMessageGeneric extends IMessage {
    generic: object;
}
export interface IMessagePhysicalActivity extends IMessage {
    physicalactivity: object;
}
export interface IMessageSleep extends IMessage {
    sleep: object;
}
export interface IMessageEnvironment extends IMessage {
    environment: object;
}
export interface IMessageChild extends IMessage {
    child: object;
}
export interface IMessageFamily extends IMessage {
    family: object;
}
export interface IMessageEducator extends IMessage {
    educator: object;
}
export interface IMessageHealthProfessional extends IMessage {
    healthprofessional: object;
}
export interface IMessageApplication extends IMessage {
    application: object;
}
export interface IMessageUser extends IMessage {
    user: object;
}
export interface IMessageInstitution extends IMessage {
    institution: object;
}
