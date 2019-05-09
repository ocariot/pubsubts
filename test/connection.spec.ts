// 'use strict';
import {IOptions} from '../index';
import { expect } from 'chai';
import * as fs from "fs"
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

const options: IOptions = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

describe('Broker Connection', () => {
    it('Trying connect, should return TRUE if bound - Not Implemented', () => {

        // let pubsub : EventBus = new EventBus();
        //
        // pubsub.connect('ip-machine', 5671, 'guest', 'guest', options).then((result)=>{
        //     console.log("Tudo Certo!!!" + result)
        //     expect(result).to.equal(true)
        // })

    });
    it('Get status connections - Not Implemented', () => {

        // let pubsub : EventBus = new EventBus();
        //
        // let result = pubsub.isConnected;
        //
        // expect(result).to.equal(false)
    });
});
