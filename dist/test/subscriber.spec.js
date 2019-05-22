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
    it('subSavePhysicalActivity() - should return OcariotPubSubException when it haven\'t connection', () => __awaiter(this, void 0, void 0, function* () {
        yield pubsubWithoutConnection.subSavePhysicalActivity({ mesage: "I'am here" }).catch((err) => {
            chai_1.expect(err).instanceOf(ocariotPubSub_exception_1.OcariotPubSubException);
        });
    }));
    it('subSavePhysicalActivity() - should return TRUE when subscribe in a connection', () => __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield pubsub.subSavePhysicalActivity({ mesage: "I'am here" });
            chai_1.expect(result).to.equal(true);
        }
        catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message);
        }
    }));
});
