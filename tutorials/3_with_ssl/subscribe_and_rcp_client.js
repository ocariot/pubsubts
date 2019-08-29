"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var fs = require("fs");
var connOptions = {
    interval: 1000,
    sslOptions: {
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
};
var connParams = {
    protocol: 'amqps',
    hostname: 'ip-machine',
    port: 5671,
    username: 'guest',
    password: 'guest'
};
function receiveMessage(err, message) {
    if (err) {
        console.log('Erro Callback: ', err);
        return;
    }
    console.log('Resultado Callback: ', message);
}
var ocariot = new index_1.RabbitMQClient('Account', connParams, connOptions);
ocariot.subSavePhysicalActivity(function (message) {
    console.log(message);
});
ocariot.getPhysicalActivities('?end_at=2018-12-11&period=10d').then(function (message) {
    console.log('Resultado Promise: ', message);
})["catch"](function (err) {
    console.log('Erro Promise: ', err);
});
ocariot.getSleep('?start_at=2017-12-24&period=1y', receiveMessage);
