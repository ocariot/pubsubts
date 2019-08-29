"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var fs = require("fs");
var connOptions = {
    retries: 5,
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
var ocariot = new index_1.RabbitMQClient('Account', connParams, connOptions);
ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' })["catch"](function (err) {
    console.log(err);
});
ocariot.providePhysicalActivities(function (query) {
    return query + ' PhysicalActivities Processado';
});
ocariot.provideSleep(function (query) {
    return query + ' Sleep Processado';
});
