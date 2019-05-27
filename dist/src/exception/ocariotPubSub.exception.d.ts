export declare class OcariotPubSubException extends Error implements IExceptionError {
    code: number;
    description?: string;
    constructor(err: any);
    toJson(): object;
}
export interface IExceptionError {
    code: number;
    message: string;
    description?: string;
    toJson(): object;
}
