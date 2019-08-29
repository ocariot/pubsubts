"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var ocariot = new index_1.RabbitMQClient('Analytics', 'amqp://guest:guest@localhost:5672');
function receiveMessage(err, message) {
    if (err) {
        console.log('Erro Callback: ', err);
        return;
    }
    console.log('Resultado Callback: ', message);
}
ocariot.getPhysicalActivities('?end_at=2018-12-11&period=10d', receiveMessage);
ocariot.getPhysicalActivities('?end_at=2018-12-11&period=10d').then(function (message) {
    console.log('Resultado Promise: ', message);
})["catch"](function (err) {
    console.log('Erro Promise: ', err);
});
ocariot.getSleep('?start_at=2017-12-24&period=1y', receiveMessage);
ocariot.getSleep('?start_at=2017-12-24&period=1y').then(function (message) {
    console.log('Resultado Promise: ', message);
})["catch"](function (err) {
    console.log('Erro Promise: ', err);
});
