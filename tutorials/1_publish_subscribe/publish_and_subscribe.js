"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
var options = {
    receiveFromYourself: true
};
var ocariot = new index_1.RabbitMQClient('Account', {}, options);
ocariot.subSavePhysicalActivity(function (message) {
    console.log(message);
});
ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' })["catch"](function (err) {
    console.log(err);
});
