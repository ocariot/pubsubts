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
        ca: './test/ssl/certifications/ca_certificate.pem'
    }
}

describe('Publish in a Connection', () => {

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

    after(function () {
        setTimeout(() => {
            pubsub.close();
        },1000)
    });

    it('pubSavePhysicalActivity() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubSavePhysicalActivity({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubUpdatePhysicalActivity() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubUpdatePhysicalActivity({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubDeletePhysicalActivity() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubDeletePhysicalActivity({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubSaveSleep() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubSaveSleep({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubUpdateSleep() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubUpdateSleep({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubDeleteSleep() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubDeleteSleep({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubSaveEnvironment() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubSaveEnvironment({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubDeleteEnvironment() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubDeleteEnvironment({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubUpdateChild() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubUpdateChild({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubUpdateFamily() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubUpdateFamily({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubUpdateEducator() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubUpdateEducator({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubUpdateHealthProfessional() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubUpdateHealthProfessional({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubUpdateApplication() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubUpdateApplication({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubDeleteUser() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubDeleteUser({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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

    it('pubDeleteInstitution() - should return FALSE when it haven\'t connection',    () => {

        pubsubWithoutConnection.pubDeleteInstitution({ mesage: "I'am here" }).then(result => {
            expect(result).to.equal(false)
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
