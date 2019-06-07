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
        ca: './test/ssl/certifications/ca_certificate.pem'
    }
}

describe('Broker Connection', () => {

    let pubsub;
    let pubsubWithoutConnection;
    let connectionSpy;

    before(function () {
        pubsub = new OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);
        pubsubWithoutConnection = new OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);
        connectionSpy = sinon.spy();

        pubsub.on('connected', connectionSpy)
        pubsub.on('reconnected', connectionSpy)
        pubsub.on('disconnected', connectionSpy)
        // pubsub.on('trying_connection', connectionSpy)
        // pubsub.on('lost_connection', connectionSpy)
        // pubsub.on('error', connectionSpy)

    });

    after(function(){
        setTimeout(() => {
            pubsub.close();
            pubsubWithoutConnection.close();
        },1000)
    });

    afterEach(async function () {
        connectionSpy.resetHistory()
    });

    it('should return OcariotPubSubException when it haven\'t connection',  async () => {
        await pubsubWithoutConnection.connect().catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
            expect(connectionSpy.callCount).to.equal(1);
        })
    });

    it('should return OcariotPubSubException when it try close a connection without have connection',  () => {
        pubsub.close().catch((err) => {
            expect(err).instanceOf(OcariotPubSubException)
        })
    });

    it('Trying connect, should return TRUE if bound ', async () => {
        try{
             await pubsub.connect().then((result) => {
                expect(result).to.equal(true)
                expect(connectionSpy.callCount).to.equal(1);
            })
        }catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('Trying close connection, should return TRUE if it\'s unbound ', async () => {
        try{

            pubsub.close().then((result) => {
               if (result){
                    expect(connectionSpy.callCount).to.equal(1);
                }else {
                    expect(connectionSpy.callCount).to.equal(0);
                }
            })
        }catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

    it('Get status connections, should return FALSE if it\'s unbound',  () => {
        try{
            let result = pubsub.isConnected;
            expect(result).to.equal(false)
        }catch (err) {
            throw new Error('Failure on EventBus test: ' + err.message)
        }
    });

});
