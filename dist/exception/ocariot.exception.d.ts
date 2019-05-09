export declare class Exception extends Error implements IExceptionError {
    code: number;
    description?: string;
    constructor(code: number, message: string, description?: string);
    toJson(): Object;
}
export interface IExceptionError {
    code: number;
    message: string;
    description?: string;
    toJson(): Object;
}
