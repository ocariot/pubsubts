// 'use strict';
import { IOptions, OcariotPubSub } from '../index';
import { expect } from 'chai';
import * as fs from "fs"
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';
import { OcariotPubSubException } from '../src/exception/ocariotPubSub.exception'
import * as sinon from 'sinon';

const options: IOptions = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

describe('Publish in a Connection', () => {

    let pubsub;
    let pubsubWithoutConnectio;

    before(async function () {
        pubsub = new OcariotPubSub();
        pubsubWithoutConnectio = new OcariotPubSub();

        try{
            await pubsub.connect('ip-machine', 5671, 'guest', 'guest', options).then((result) => {
                expect(result).to.equal(true)
            })
        }catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }

    });

    afterEach(function(){

    });

    it('pubSavePhysicalActivity() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubSavePhysicalActivity({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubSavePhysicalActivity() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubSavePhysicalActivity({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubUpdatePhysicalActivity() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubUpdatePhysicalActivity({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubUpdatePhysicalActivity() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubUpdatePhysicalActivity({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubDeletePhysicalActivity() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubDeletePhysicalActivity({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubDeletePhysicalActivity() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubDeletePhysicalActivity({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubSaveSleep() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubSaveSleep({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubSaveSleep() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubSaveSleep({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubUpdateSleep() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubUpdateSleep({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubUpdateSleep() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubUpdateSleep({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubDeleteSleep() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubDeleteSleep({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubDeleteSleep() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubDeleteSleep({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubSaveEnvironment() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubSaveEnvironment({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubSaveEnvironment() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubSaveEnvironment({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubDeleteEnvironment() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubDeleteEnvironment({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubDeleteEnvironment() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubDeleteEnvironment({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubUpdateChild() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubUpdateChild({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubUpdateChild() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubUpdateChild({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubUpdateFamily() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubUpdateFamily({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubUpdateFamily() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubUpdateFamily({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubUpdateEducator() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubUpdateEducator({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubUpdateEducator() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubUpdateEducator({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubUpdateHealthProfessional() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubUpdateHealthProfessional({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubUpdateHealthProfessional() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubUpdateHealthProfessional({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubUpdateApplication() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubUpdateApplication({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubUpdateApplication() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubUpdateApplication({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubDeleteUser() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubDeleteUser({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubDeleteUser() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubDeleteUser({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('pubDeleteInstitution() - should return OcariotPubSubException when it haven\'t connection',    () => {

        pubsubWithoutConnectio.pubDeleteInstitution({ mesage: "I'am here" }).catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })

    });

    it('pubDeleteInstitution() - should return TRUE when publised in a connection',   async() => {
        try {
            let result = await pubsub.pubDeleteInstitution({ mesage: "I'am here" })
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

});
