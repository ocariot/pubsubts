export class OcariotPubSubException extends Error implements IExceptionError {
    code: number
    description?: string

    constructor(err: any) {
        super(err.message)
        this.code = err.code
        // this.description = err.description

    }

    toJson(): Object {
        return {
            'code': this.code,
            'message': this.message,
            // 'description': this.description
        }
    }
}

export interface IExceptionError {
    code: number
    message: string
    description?: string
    toJson(): Object
}
