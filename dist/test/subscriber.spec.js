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
function receiveMessage(message) {
    console.log(message);
}
describe('Subscriber in a Connection', () => {
    let pubsub;
    let pubsubWithoutConnection;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            pubsub = new index_1.OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);
            pubsubWithoutConnection = new index_1.OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);
            try {
                yield pubsub.connect().then((result) => {
                    chai_1.expect(result).to.equal(true);
                });
            }
            catch (err) {
                throw new Error('Failure on EventBus test: ' + err.message);
            }
        });
    });
    after(function () {
        setTimeout(() => {
            pubsub.close();
        }, 1000);
    });
    it('subSavePhysicalActivity() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subSavePhysicalActivity(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subSavePhysicalActivity() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subSavePhysicalActivity(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdatePhysicalActivity() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdatePhysicalActivity(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdatePhysicalActivity() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdatePhysicalActivity(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeletePhysicalActivity() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeletePhysicalActivity(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeletePhysicalActivity() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeletePhysicalActivity(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subSaveSleep() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subSaveSleep(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subSaveSleep() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subSaveSleep(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateSleep() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateSleep(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateSleep() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateSleep(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteSleep() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteSleep(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteSleep() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteSleep(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subSaveEnvironment() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subSaveEnvironment(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subSaveEnvironment() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subSaveEnvironment(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteEnvironment() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteEnvironment(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteEnvironment() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteEnvironment(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateChild() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateChild(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateChild() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateChild(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateFamily() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateFamily(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateFamily() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateFamily(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateEducator() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateEducator(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateEducator() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateEducator(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateHealthProfessional() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateHealthProfessional(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateHealthProfessional() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateHealthProfessional(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subUpdateApplication() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subUpdateApplication(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subUpdateApplication() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subUpdateApplication(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteUser() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteUser(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteUser() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteUser(receiveMessage);
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('subDeleteInstitution() - should return FALSE when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subDeleteInstitution(receiveMessage).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    }));
    it('subDeleteInstitution() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subDeleteInstitution(receiveMessage);
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
