// 'use strict';
import { IOptions, OcariotPubSub } from '../index';
import { expect } from 'chai';
import * as fs from "fs"
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';
import { OcariotPubSubException } from '../src/exception/ocariotPubSub.exception'

const options: IOptions = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

function receiveMessageLucas (message) {
    console.log(message)
}

describe('Subscriber in a Connection', () => {

    let pubsub;
    let pubsubWithoutConnection;

    before(async function () {
        pubsub = new OcariotPubSub();
        pubsubWithoutConnection = new OcariotPubSub();

        try{
            await pubsub.connect('ip-machine', 5671, 'guest', 'guest', options).then((result) => {
                expect(result).to.equal(true)
            })
        }catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }

    });

    it('subSavePhysicalActivity() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subSavePhysicalActivity(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subSavePhysicalActivity() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subSavePhysicalActivity(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdatePhysicalActivity() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdatePhysicalActivity(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdatePhysicalActivity() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdatePhysicalActivity(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeletePhysicalActivity() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeletePhysicalActivity(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeletePhysicalActivity() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeletePhysicalActivity(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subSaveSleep() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subSaveSleep(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subSaveSleep() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subSaveSleep(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateSleep() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateSleep(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateSleep() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateSleep(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteSleep() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteSleep(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteSleep() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteSleep(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subSaveEnvironment() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subSaveEnvironment(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subSaveEnvironment() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subSaveEnvironment(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteEnvironment() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteEnvironment(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteEnvironment() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteEnvironment(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateChild() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateChild(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateChild() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateChild(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateFamily() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateFamily(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateFamily() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateFamily(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateEducator() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateEducator(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateEducator() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateEducator(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateHealthProfessional() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateHealthProfessional(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateHealthProfessional() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateHealthProfessional(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateApplication() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateApplication(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateApplication() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateApplication(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteUser() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteUser(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteUser() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteUser(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteInstitution() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteInstitution(receiveMessageLucas).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteInstitution() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteInstitution(receiveMessageLucas)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('receiveFromYourself() - should return FALSE when receiveFromYourself it\'s NOT activied',    async () => {
        try {
            let result = await pubsub.receiveFromYourself(false)
            expect(result).to.equal(false)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('receiveFromYourself() - should return TRUE when receiveFromYourself it\'s activied',   async() => {
        try {
            let result = await pubsub.receiveFromYourself(true)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

});
