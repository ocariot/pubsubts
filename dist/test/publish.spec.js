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
describe('Publish in a Connection', () => {
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
    it('pubSavePhysicalActivity() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubSavePhysicalActivity({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubSavePhysicalActivity() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubSavePhysicalActivity({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubUpdatePhysicalActivity() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubUpdatePhysicalActivity({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubUpdatePhysicalActivity() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubUpdatePhysicalActivity({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubDeletePhysicalActivity() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubDeletePhysicalActivity({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubDeletePhysicalActivity() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubDeletePhysicalActivity({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubSaveSleep() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubSaveSleep({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubSaveSleep() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubSaveSleep({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubUpdateSleep() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubUpdateSleep({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubUpdateSleep() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubUpdateSleep({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubDeleteSleep() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubDeleteSleep({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubDeleteSleep() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubDeleteSleep({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubSaveEnvironment() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubSaveEnvironment({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubSaveEnvironment() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubSaveEnvironment({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubDeleteEnvironment() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubDeleteEnvironment({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubDeleteEnvironment() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubDeleteEnvironment({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubUpdateChild() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubUpdateChild({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubUpdateChild() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubUpdateChild({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubUpdateFamily() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubUpdateFamily({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubUpdateFamily() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubUpdateFamily({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubUpdateEducator() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubUpdateEducator({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubUpdateEducator() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubUpdateEducator({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubUpdateHealthProfessional() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubUpdateHealthProfessional({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubUpdateHealthProfessional() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubUpdateHealthProfessional({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubUpdateApplication() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubUpdateApplication({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubUpdateApplication() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubUpdateApplication({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubDeleteUser() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubDeleteUser({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubDeleteUser() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubDeleteUser({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('pubDeleteInstitution() - should return FALSE when it haven\'t connection', () => {
        pubsubWithoutConnection.pubDeleteInstitution({ mesage: "I'am here" }).then(result => {
            chai_1.expect(result).to.equal(false);
        });
    });
    it('pubDeleteInstitution() - should return TRUE when publised in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.pubDeleteInstitution({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
});
