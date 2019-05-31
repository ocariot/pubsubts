// 'use strict';
import { IOptions, OcariotPubSub } from '../index';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

const options: IOptions = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: './ssl/certifications/ca_certificate.pem'
    }
}

describe('Issuance of Logs on a Connection', () => {

    let pubsub;

    before(async function () {
        pubsub = new OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);
    });

    it('logger() - should return TRUE when it pass only the enabled parameter', () => {

        let result: boolean = pubsub.logger(false);

        expect(result).to.equal(true)
    });

    it('logger() - should return TRUE when it pass th level parameter as \'error\'', () => {

        let result: boolean = pubsub.logger(true,'error');

        expect(result).to.equal(true)
    });

    it('logger() - should return TRUE when it pass th level parameter as \'warn\'', () => {

        let result: boolean = pubsub.logger(true,'warn');

        expect(result).to.equal(true)
    });

    it('logger() - should return TRUE when it pass th level parameter as \'info\'', () => {

        let result: boolean = pubsub.logger(true,'info');

        expect(result).to.equal(true)
    });

    it('logger() - should return FALSE when it pass a level different of \'error \', \'warn\' or \'info\'', () => {

        let result: boolean = pubsub.logger(true,'other');

        expect(result).to.equal(false)
    });
});
