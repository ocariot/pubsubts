"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception extends Error {
    constructor(code, message, description) {
        super(message);
        this.code = code;
        this.description = description;
    }
    toJson() {
        return {
            'code': this.code,
            'message': this.message,
            'description': this.description
        };
    }
}
exports.Exception = Exception;
