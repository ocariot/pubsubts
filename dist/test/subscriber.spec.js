"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 'use strict';
const index_1 = require("../index");
const chai_1 = require("chai");
const fs = __importStar(require("fs"));
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
require("mocha");
const options = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
};
function receiveMessageLucas(message) {
    console.log(message);
}
describe('Subscriber in a Connection', () => {
    let pubsub;
    let pubsubWithoutConnection;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            pubsub = new index_1.OcariotPubSub();
            pubsubWithoutConnection = new index_1.OcariotPubSub();
            try {
                yield pubsub.connect('ip-machine', 5671, 'guest', 'guest', options).then((result) => {
                    chai_1.expect(result).to.equal(true);
                });
            }
            catch (err) {
                throw new Error('Failure on EventBus test: ' + err.message);
            }
        });
    });
    it('subSavePhysicalActivity() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subSavePhysicalActivity(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subSavePhysicalActivity() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subSavePhysicalActivity(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdatePhysicalActivity() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdatePhysicalActivity(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdatePhysicalActivity() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdatePhysicalActivity(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeletePhysicalActivity() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeletePhysicalActivity(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeletePhysicalActivity() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeletePhysicalActivity(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subSaveSleep() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subSaveSleep(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subSaveSleep() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subSaveSleep(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateSleep() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateSleep(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateSleep() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateSleep(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteSleep() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteSleep(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteSleep() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteSleep(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subSaveEnvironment() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subSaveEnvironment(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subSaveEnvironment() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subSaveEnvironment(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteEnvironment() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteEnvironment(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteEnvironment() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteEnvironment(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateChild() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateChild(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateChild() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateChild(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateFamily() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateFamily(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateFamily() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateFamily(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateEducator() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateEducator(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateEducator() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateEducator(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateHealthProfessional() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateHealthProfessional(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateHealthProfessional() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateHealthProfessional(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateApplication() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateApplication(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateApplication() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateApplication(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteUser() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteUser(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteUser() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteUser(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteInstitution() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteInstitution(receiveMessageLucas).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteInstitution() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteInstitution(receiveMessageLucas);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('receiveFromYourself() - should return FALSE when receiveFromYourself it\'s NOT activied', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.receiveFromYourself(false);
            chai_1.expect(result).to.equal(false);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('receiveFromYourself() - should return TRUE when receiveFromYourself it\'s activied', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.receiveFromYourself(true);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
});
