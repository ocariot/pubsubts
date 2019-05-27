"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OcariotPubSubException extends Error {
    constructor(err) {
        super(err.message);
        this.code = err.code;
        // this.description = err.description
    }
    toJson() {
        return {
            code: this.code,
            message: this.message,
        };
    }
}
exports.OcariotPubSubException = OcariotPubSubException;
