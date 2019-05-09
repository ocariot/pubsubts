"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
require("mocha");
const options = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
};
describe('Broker Connection', () => {
    it('Trying connect, should return TRUE if bound', () => {
        // let pubsub : ManagerConnection = new ManagerConnection();
        //
        // pubsub.connect('ip-machine', 5671, 'guest', 'guest', options).then((result)=>{
        //     console.log("Tudo Certo!!!" + result)
        //     expect(result).to.equal(true)
        // })
    });
    it('Get status connections', () => {
        // let pubsub : ManagerConnection = new ManagerConnection();
        //
        // let result = pubsub.isConnected;
        //
        // expect(result).to.equal(false)
    });
});
