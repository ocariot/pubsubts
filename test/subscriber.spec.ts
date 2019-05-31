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
        ca: './ssl/certifications/ca_certificate.pem'
    }
}

function receiveMessage (message) {
    console.log(message)
}

describe('Subscriber in a Connection', () => {

    let pubsub;
    let pubsubWithoutConnection;

    before(async function () {
        pubsub = new OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);
        pubsubWithoutConnection = new OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);

        try{
            await pubsub.connect().then((result) => {
                expect(result).to.equal(true)
            })
        }catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }

    });

    after(function(){
        setTimeout(() => {
            pubsub.close();
        },1000)
    });

    it('subSavePhysicalActivity() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subSavePhysicalActivity(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subSavePhysicalActivity() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subSavePhysicalActivity(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdatePhysicalActivity() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdatePhysicalActivity(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdatePhysicalActivity() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdatePhysicalActivity(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeletePhysicalActivity() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeletePhysicalActivity(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeletePhysicalActivity() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeletePhysicalActivity(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subSaveSleep() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subSaveSleep(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subSaveSleep() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subSaveSleep(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateSleep() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateSleep(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateSleep() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateSleep(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteSleep() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteSleep(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteSleep() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteSleep(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subSaveEnvironment() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subSaveEnvironment(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subSaveEnvironment() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subSaveEnvironment(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteEnvironment() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteEnvironment(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteEnvironment() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteEnvironment(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateChild() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateChild(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateChild() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateChild(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateFamily() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateFamily(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateFamily() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateFamily(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateEducator() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateEducator(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateEducator() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateEducator(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateHealthProfessional() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateHealthProfessional(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateHealthProfessional() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateHealthProfessional(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subUpdateApplication() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subUpdateApplication(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subUpdateApplication() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subUpdateApplication(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteUser() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteUser(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteUser() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteUser(receiveMessage)
            expect(result).to.equal(true)
        } catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('subDeleteInstitution() - should return FALSE when it haven\'t connection',    async () => {
        await pubsubWithoutConnection.subDeleteInstitution(receiveMessage).then(result => {
            expect(result).to.equal(false)
        })
    });

    it('subDeleteInstitution() - should return TRUE when subscribe in a connection',   async() => {
        try {
            let result = await pubsub.subDeleteInstitution(receiveMessage)
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
