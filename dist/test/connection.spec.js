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
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
require("mocha");
const ocariotPubSub_exception_1 = require("../src/exception/ocariotPubSub.exception");
const sinon = __importStar(require("sinon"));
const options = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: './ssl/certifications/ca_certificate.pem'
    }
};
describe('Broker Connection', () => {
    let pubsub;
    let connectionSpy;
    before(function () {
        pubsub = new index_1.OcariotPubSub();
        connectionSpy = sinon.spy();
        pubsub.on('connected', connectionSpy);
        pubsub.on('disconnected', connectionSpy);
        pubsub.on('error', connectionSpy);
    });
    afterEach(function () {
        connectionSpy.resetHistory();
    });
    it('should return OcariotPubSubException when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsub.connect('ip-machin', 5671, 'guest', 'guest', options).then((result) => { console.log("asd" + result); }).catch((err) => {
            console.log(err);
            chai_1.expect(err.toString()).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
            chai_1.expect(err).instanceOf(TypeError);
            chai_1.expect(connectionSpy.callCount).to.equal(1);
        });
    }));
    it('should return OcariotPubSubException when it try close a connection without have connection', () => {
        pubsub.close().catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
        });
    });
    it('Trying connect, should return TRUE if bound ', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield pubsub.connect('ip-machine', 5671, 'guest', 'guest', options).then((result) => {
                chai_1.expect(result).to.equal(true);
                chai_1.expect(connectionSpy.callCount).to.equal(1);
            });
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('Trying close connection, should return TRUE if it\'s unbound ', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield pubsub.close().then((result) => {
                chai_1.expect(result).to.equal(true);
                chai_1.expect(connectionSpy.callCount).to.equal(1);
            });
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
    it('Get status connections, should return FALSE if it\'s unbound', () => {
        try {
            let result = pubsub.isConnected;
            chai_1.expect(result).to.equal(false);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    });
});
