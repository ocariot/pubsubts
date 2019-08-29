"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var connParams = {
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest'
};
var ocariot = new index_1.RabbitMQClient('activity.app', connParams);
ocariot.providePhysicalActivities(function (query) {
    return query + ' PhysicalActivities Processado';
});
ocariot.provideSleep(function (query) {
    return query + ' Sleep Processado';
});
