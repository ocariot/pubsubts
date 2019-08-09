"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var ocariot = new index_1.RabbitMQClient('Account');
ocariot.subSavePhysicalActivity(function (message) {
    console.log(message);
});
