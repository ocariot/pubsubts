// 'use strict';
import {ManagerConnection, Options} from '../index';
import { expect } from 'chai';
import * as fs from "fs"
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
import 'mocha';

const options: Options = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

describe('Broker Connection', () => {
    it('Trying connect, should return TRUE if bound - Not Implemented', () => {

        // let pubsub : ManagerConnection = new ManagerConnection();
        //
        // pubsub.connect('ip-machine', 5671, 'guest', 'guest', options).then((result)=>{
        //     console.log("Tudo Certo!!!" + result)
        //     expect(result).to.equal(true)
        // })

    });
    it('Get status connections - Not Implemented', () => {

        // let pubsub : ManagerConnection = new ManagerConnection();
        //
        // let result = pubsub.isConnected;
        //
        // expect(result).to.equal(false)
    });
});
