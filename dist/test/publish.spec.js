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
const ocariotPubSub_exception_1 = require("../src/exception/ocariotPubSub.exception");
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
    let pubsubWithoutConnectio;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            pubsub = new index_1.OcariotPubSub();
            pubsubWithoutConnectio = new index_1.OcariotPubSub();
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
    afterEach(function () {
    });
    it('pubSavePhysicalActivity() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubSavePhysicalActivity({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubUpdatePhysicalActivity() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubUpdatePhysicalActivity({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubDeletePhysicalActivity() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubDeletePhysicalActivity({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubSaveSleep() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubSaveSleep({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubUpdateSleep() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubUpdateSleep({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubDeleteSleep() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubDeleteSleep({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubSaveEnvironment() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubSaveEnvironment({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubDeleteEnvironment() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubDeleteEnvironment({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubUpdateChild() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubUpdateChild({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubUpdateFamily() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubUpdateFamily({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubUpdateEducator() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubUpdateEducator({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubUpdateHealthProfessional() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubUpdateHealthProfessional({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubUpdateApplication() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubUpdateApplication({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubDeleteUser() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubDeleteUser({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
    it('pubDeleteInstitution() - should return OcariotPubSubException when it haven\'t connection', () => {
        pubsubWithoutConnectio.pubDeleteInstitution({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
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
