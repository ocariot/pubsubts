"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// 'use strict';
const index_1 = require("../index");
const chai_1 = require("chai");
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
require("mocha");
const options = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: './ssl/certifications/ca_certificate.pem'
    }
};
describe('Issuance of Logs on a Connection', () => {
    let pubsub;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            pubsub = new index_1.OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);
        });
    });
    it('logger() - should return TRUE when it pass only the enabled parameter', () => {
        let result = pubsub.logger(false);
        chai_1.expect(result).to.equal(true);
    });
    it('logger() - should return TRUE when it pass th level parameter as \'error\'', () => {
        let result = pubsub.logger(true, 'error');
        chai_1.expect(result).to.equal(true);
    });
    it('logger() - should return TRUE when it pass th level parameter as \'warn\'', () => {
        let result = pubsub.logger(true, 'warn');
        chai_1.expect(result).to.equal(true);
    });
    it('logger() - should return TRUE when it pass th level parameter as \'info\'', () => {
        let result = pubsub.logger(true, 'info');
        chai_1.expect(result).to.equal(true);
    });
    it('logger() - should return FALSE when it pass a level different of \'error \', \'warn\' or \'info\'', () => {
        let result = pubsub.logger(true, 'other');
        chai_1.expect(result).to.equal(false);
    });
});
