"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var amqp_client_node_1 = require("amqp-client-node");
var routing_keys_name_1 = require("../utils/routing.keys.name");
var exchange_name_1 = require("../utils/exchange.name");
var event_name_1 = require("../utils/event.name");
var configurations_1 = require("../utils/configurations");
var events_1 = require("events");
var queue_name_1 = require("../utils/queue.name");
var resource_name_1 = require("../utils/resource.name");
var defaultOptionPub = {
    exchange: {
        durable: true,
        type: 'direct'
    }
};
var defaultOptionSub = {
    consumer: { noAck: true },
    exchange: {
        durable: true,
        type: 'direct'
    },
    queue: {
        durable: true
    },
    receiveFromYourself: true
};
var defaultOptionRpcClient = {
    exchange: {
        durable: true,
        type: 'direct'
    },
    rcpTimeout: 5000
};
var defaultOptionRpcServer = {
    consumer: { noAck: false },
    exchange: {
        durable: true,
        type: 'direct'
    },
    queue: {
        durable: true
    }
};
var defaultConnConfig = {
    protocol: 'amqp',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: 'ocariot'
};
var defaultConnOpt = {
    retries: 0,
    interval: 1000
};
var RabbitMQClient = /** @class */ (function (_super) {
    __extends(RabbitMQClient, _super);
    function RabbitMQClient(_appName, connParams, connOptions) {
        var _this = _super.call(this) || this;
        _this._appName = _appName;
        _this._connConfig = __assign({}, defaultConnConfig);
        if (typeof connParams === 'object') {
            _this._connConfig = __assign({}, _this._connConfig, connParams);
        }
        if (typeof connParams === 'string') {
            _this._connConfig = connParams.concat('/').concat(configurations_1.Configurations.VHOST);
        }
        _this._connOpt = __assign({}, defaultConnOpt, connOptions);
        if (connOptions) {
            if (connOptions.receiveFromYourself !== undefined)
                defaultOptionSub.receiveFromYourself = connOptions.receiveFromYourself;
            if (connOptions.rpcTimeout)
                defaultOptionRpcClient.rcpTimeout = connOptions.rpcTimeout;
        }
        return _this;
    }
    RabbitMQClient.prototype.pubEventInitialization = function () {
        var _this = this;
        this._pubConnection.on('close_connection', function () {
            _this.emit('pub_disconnected');
        });
        this._pubConnection.on('re_established_connection', function () {
            _this.emit('pub_reconnected');
        });
        this._pubConnection.on('trying_connect', function () {
            _this.emit('pub_trying_connection');
        });
        this._pubConnection.on('lost_connection', function () {
            _this.emit('pub_lost_connection');
        });
        this._pubConnection.on('error_connection', function (err) {
            _this.emit('pub_connection_error', err);
        });
    };
    RabbitMQClient.prototype.subEventInitialization = function () {
        var _this = this;
        this._subConnection.on('close_connection', function () {
            _this.emit('sub_disconnected');
        });
        this._subConnection.on('re_established_connection', function () {
            _this.emit('sub_reconnected');
        });
        this._subConnection.on('trying_connect', function () {
            _this.emit('sub_trying_connection');
        });
        this._subConnection.on('lost_connection', function () {
            _this.emit('sub_lost_connection');
        });
        this._subConnection.on('error_connection', function (err) {
            _this.emit('sub_connection_error', err);
        });
    };
    RabbitMQClient.prototype.serverEventInitialization = function () {
        var _this = this;
        this._serverConnection.on('close_connection', function () {
            _this.emit('rpc_server_disconnected');
        });
        this._serverConnection.on('re_established_connection', function () {
            _this.emit('rpc_server_reconnected');
        });
        this._serverConnection.on('trying_connect', function () {
            _this.emit('rpc_server_trying_connection');
        });
        this._serverConnection.on('lost_connection', function () {
            _this.emit('rpc_server_lost_connection');
        });
        this._serverConnection.on('error_connection', function (err) {
            _this.emit('rpc_server_connection_error', err);
        });
    };
    RabbitMQClient.prototype.clientEventInitialization = function () {
        var _this = this;
        this._clientConnection.on('close_connection', function () {
            _this.emit('rpc_client_disconnected');
        });
        this._clientConnection.on('re_established_connection', function () {
            _this.emit('rpc_client_reconnected');
        });
        this._clientConnection.on('trying_connect', function () {
            _this.emit('rpc_client_trying_connection');
        });
        this._clientConnection.on('lost_connection', function () {
            _this.emit('rpc_client_lost_connection');
        });
        this._clientConnection.on('error_connection', function (err) {
            _this.emit('rpc_client_connection_error', err);
        });
    };
    RabbitMQClient.prototype.logger = function (enabled, level) {
        if (level === 'warn' || level === 'error' || level === 'info' || !level) {
            amqp_client_node_1.amqpClient.logger(level);
        }
    };
    RabbitMQClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this._pubConnection.close()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._subConnection.close()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._clientConnection.close()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._serverConnection.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve()];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RabbitMQClient.prototype.dispose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this._pubConnection.dispose()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._subConnection.dispose()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._clientConnection.dispose()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._serverConnection.dispose()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve()];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RabbitMQClient.prototype.pub = function (exchangeName, routingKey, body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, err_3, err_4;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(!this._pubConnection && !this._pubConnectionInitialized)) return [3 /*break*/, 4];
                                    this._pubConnectionInitialized = amqp_client_node_1.amqpClient.createConnetion(this._connConfig, this._connOpt);
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    _a = this;
                                    return [4 /*yield*/, this._pubConnectionInitialized];
                                case 2:
                                    _a._pubConnection = _b.sent();
                                    this.pubEventInitialization();
                                    this.emit('pub_connected');
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_3 = _b.sent();
                                    this._pubConnection = undefined;
                                    this._pubConnectionInitialized = undefined;
                                    return [2 /*return*/, reject(err_3)];
                                case 4:
                                    _b.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, this._pubConnectionInitialized];
                                case 5:
                                    _b.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_4 = _b.sent();
                                    return [2 /*return*/, reject(err_4)];
                                case 7: return [2 /*return*/, this._pubConnection.pub(exchangeName, routingKey, body, defaultOptionPub)];
                            }
                        });
                    }); })];
            });
        });
    };
    RabbitMQClient.prototype.sub = function (targetMicroservice, exchangeName, routingKey, callback) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, err_5, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this._subConnection && !this._subConnectionInitialized)) return [3 /*break*/, 4];
                        this._subConnectionInitialized = amqp_client_node_1.amqpClient.createConnetion(this._connConfig, this._connOpt);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this._subConnectionInitialized];
                    case 2:
                        _a._subConnection = _b.sent();
                        this.subEventInitialization();
                        this.emit('sub_connected');
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _b.sent();
                        this._subConnection = undefined;
                        this._subConnectionInitialized = undefined;
                        return [2 /*return*/, reject(err_5)];
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this._subConnectionInitialized];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_6 = _b.sent();
                        return [2 /*return*/, reject(err_6)];
                    case 7: return [2 /*return*/, this._subConnection.sub(this._appName.concat(targetMicroservice), exchangeName, routingKey, function (msg) { return callback(msg.content); }, defaultOptionSub)];
                }
            });
        }); });
    };
    RabbitMQClient.prototype.serverConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, err_7, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._serverConnectionInitialized) return [3 /*break*/, 4];
                        this._serverConnectionInitialized = amqp_client_node_1.amqpClient.createConnetion(this._connConfig, this._connOpt);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this._serverConnectionInitialized];
                    case 2:
                        _a._serverConnection = _b.sent();
                        this.serverEventInitialization();
                        this.emit('rpc_server_connected');
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _b.sent();
                        this._serverConnection = undefined;
                        this._serverConnectionInitialized = undefined;
                        return [2 /*return*/, reject(err_7)];
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this._serverConnectionInitialized];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, resolve()];
                    case 6:
                        err_8 = _b.sent();
                        return [2 /*return*/, reject(err_8)];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    RabbitMQClient.prototype.resource = function (sourceMicroservice, exchangeName, name, func) {
        var _this = this;
        new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var server;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serverConnection()];
                    case 1:
                        _a.sent();
                        server = this._serverConnection
                            .createRpcServer(sourceMicroservice, exchangeName, [], defaultOptionRpcServer);
                        if (!server.addResource(name, func)) return [3 /*break*/, 3];
                        return [4 /*yield*/, server.start()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        }); })["catch"](function (err) {
            throw err;
        });
    };
    RabbitMQClient.prototype.provide = function (name, func) {
        var _this = this;
        new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var server;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serverConnection()];
                    case 1:
                        _a.sent();
                        server = this._serverConnection
                            .createRpcServer(queue_name_1.TargetMicroservice.RCP_OCARIOT_GENERAL_SERVICE, exchange_name_1.ExchangeName.RPC_GENERAL, [], defaultOptionRpcServer);
                        if (!server.addResource(name, func)) return [3 /*break*/, 3];
                        return [4 /*yield*/, server.start()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        }); })["catch"](function (err) {
            throw err;
        });
    };
    RabbitMQClient.prototype.getResource = function (name, params, callback) {
        if (!callback) {
            return this.getResourcePromise(exchange_name_1.ExchangeName.RPC_GENERAL, name, params);
        }
        this.getResourceCallback(exchange_name_1.ExchangeName.RPC_GENERAL, name, params, callback);
    };
    RabbitMQClient.prototype.request = function (exchangeName, name, params, callback) {
        if (!callback) {
            return this.getResourcePromise(exchangeName, name, params);
        }
        this.getResourceCallback(exchangeName, name, params, callback);
    };
    RabbitMQClient.prototype.getResourceCallback = function (exchangeName, name, params, callback) {
        var _this = this;
        new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, err_9, err_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._clientConnectionInitialized) return [3 /*break*/, 4];
                        this._clientConnectionInitialized = amqp_client_node_1.amqpClient.createConnetion(this._connConfig, this._connOpt);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this._clientConnectionInitialized];
                    case 2:
                        _a._clientConnection = _b.sent();
                        this.clientEventInitialization();
                        this.emit('rpc_client_connected');
                        return [3 /*break*/, 4];
                    case 3:
                        err_9 = _b.sent();
                        this._clientConnectionInitialized = undefined;
                        return [2 /*return*/, reject(err_9)];
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this._clientConnectionInitialized];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_10 = _b.sent();
                        return [2 /*return*/, reject(err_10)];
                    case 7:
                        this._clientConnection.rpcClient(exchangeName, name, params, callback, defaultOptionRpcClient);
                        return [2 /*return*/];
                }
            });
        }); })["catch"](function (err) {
            throw err;
        });
    };
    RabbitMQClient.prototype.getResourcePromise = function (exchangeName, name, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, err_11, err_12;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!!this._clientConnectionInitialized) return [3 /*break*/, 4];
                                    this._clientConnectionInitialized = amqp_client_node_1.amqpClient.createConnetion(this._connConfig, this._connOpt);
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    _a = this;
                                    return [4 /*yield*/, this._clientConnectionInitialized];
                                case 2:
                                    _a._clientConnection = _b.sent();
                                    this.clientEventInitialization();
                                    this.emit('rpc_client_connected');
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_11 = _b.sent();
                                    this._clientConnectionInitialized = undefined;
                                    return [2 /*return*/, reject(err_11)];
                                case 4:
                                    _b.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, this._clientConnectionInitialized];
                                case 5:
                                    _b.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_12 = _b.sent();
                                    return [2 /*return*/, reject(err_12)];
                                case 7: return [2 /*return*/, this._clientConnection.rpcClient(exchangeName, name, params, defaultOptionRpcClient)];
                            }
                        });
                    }); })];
            });
        });
    };
    RabbitMQClient.prototype.pubSavePhysicalActivity = function (activity) {
        var message = {
            event_name: event_name_1.EventName.SAVE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        };
        return this.pub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, message);
    };
    RabbitMQClient.prototype.pubUpdatePhysicalActivity = function (activity) {
        var message = {
            event_name: event_name_1.EventName.UPDATE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        };
        return this.pub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, message);
    };
    RabbitMQClient.prototype.pubDeletePhysicalActivity = function (activity) {
        var message = {
            event_name: event_name_1.EventName.DELETE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        };
        return this.pub(exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, message);
    };
    RabbitMQClient.prototype.pubSaveSleep = function (sleep) {
        var message = {
            event_name: event_name_1.EventName.SAVE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep: sleep
        };
        return this.pub(exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.SAVE_SLEEP, message);
    };
    RabbitMQClient.prototype.pubUpdateSleep = function (sleep) {
        var message = {
            event_name: event_name_1.EventName.UPDATE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep: sleep
        };
        return this.pub(exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.UPDATE_SLEEP, message);
    };
    RabbitMQClient.prototype.pubDeleteSleep = function (sleep) {
        var message = {
            event_name: event_name_1.EventName.DELETE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep: sleep
        };
        return this.pub(exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.DELETE_SLEEP, message);
    };
    RabbitMQClient.prototype.pubSaveWeight = function (weight) {
        var message = {
            event_name: event_name_1.EventName.SAVE_WEIGHT_EVENT,
            timestamp: new Date().toISOString(),
            weight: weight
        };
        return this.pub(exchange_name_1.ExchangeName.WEIGHTS, routing_keys_name_1.RoutingKeysName.SAVE_WEIGHTS, message);
    };
    RabbitMQClient.prototype.pubDeleteWeight = function (weight) {
        var message = {
            event_name: event_name_1.EventName.DELETE_WEIGHT_EVENT,
            timestamp: new Date().toISOString(),
            weight: weight
        };
        return this.pub(exchange_name_1.ExchangeName.WEIGHTS, routing_keys_name_1.RoutingKeysName.DELETE_WEIGHTS, message);
    };
    RabbitMQClient.prototype.pubSaveBodyFat = function (bodyfat) {
        var message = {
            event_name: event_name_1.EventName.SAVE_BODY_FAT_EVENT,
            timestamp: new Date().toISOString(),
            bodyfat: bodyfat
        };
        return this.pub(exchange_name_1.ExchangeName.BODY_FATS, routing_keys_name_1.RoutingKeysName.SAVE_BODY_FATS, message);
    };
    RabbitMQClient.prototype.pubDeleteBodyFat = function (bodyfat) {
        var message = {
            event_name: event_name_1.EventName.DELETE_BODY_FAT_EVENT,
            timestamp: new Date().toISOString(),
            bodyfat: bodyfat
        };
        return this.pub(exchange_name_1.ExchangeName.BODY_FATS, routing_keys_name_1.RoutingKeysName.DELETE_BODY_FATS, message);
    };
    RabbitMQClient.prototype.pubSaveEnvironment = function (environment) {
        var message = {
            event_name: event_name_1.EventName.SAVE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment: environment
        };
        return this.pub(exchange_name_1.ExchangeName.ENVIRONMENTS, routing_keys_name_1.RoutingKeysName.SAVE_ENVIRONMENTS, message);
    };
    RabbitMQClient.prototype.pubDeleteEnvironment = function (environment) {
        var message = {
            event_name: event_name_1.EventName.DELETE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment: environment
        };
        return this.pub(exchange_name_1.ExchangeName.ENVIRONMENTS, routing_keys_name_1.RoutingKeysName.DELETE_ENVIRONMENTS, message);
    };
    RabbitMQClient.prototype.pubUpdateChild = function (child) {
        var message = {
            event_name: event_name_1.EventName.UPDATE_CHILD_EVENT,
            timestamp: new Date().toISOString(),
            child: child
        };
        return this.pub(exchange_name_1.ExchangeName.CHILDREN, routing_keys_name_1.RoutingKeysName.UPDATE_CHILDREN, message);
    };
    RabbitMQClient.prototype.pubUpdateFamily = function (family) {
        var message = {
            event_name: event_name_1.EventName.UPDATE_FAMILY_EVENT,
            timestamp: new Date().toISOString(),
            family: family
        };
        return this.pub(exchange_name_1.ExchangeName.FAMILIES, routing_keys_name_1.RoutingKeysName.UPDATE_FAMILIES, message);
    };
    RabbitMQClient.prototype.pubUpdateEducator = function (educator) {
        var message = {
            event_name: event_name_1.EventName.UPDATE_EDUCATOR_EVENT,
            timestamp: new Date().toISOString(),
            educator: educator
        };
        return this.pub(exchange_name_1.ExchangeName.EDUCATORS, routing_keys_name_1.RoutingKeysName.UPDATE_EDUCATORS, message);
    };
    RabbitMQClient.prototype.pubUpdateHealthProfessional = function (healthprofessional) {
        var message = {
            event_name: event_name_1.EventName.UPDATE_HEALTH_PROFESSIONAL_EVENT,
            timestamp: new Date().toISOString(),
            healthprofessional: healthprofessional
        };
        return this.pub(exchange_name_1.ExchangeName.HEALTH_PROFESSIONALS, routing_keys_name_1.RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, message);
    };
    RabbitMQClient.prototype.pubUpdateApplication = function (application) {
        var message = {
            event_name: event_name_1.EventName.UPDATE_APPLICATION_EVENT,
            timestamp: new Date().toISOString(),
            application: application
        };
        return this.pub(exchange_name_1.ExchangeName.APPLICATIONS, routing_keys_name_1.RoutingKeysName.UPDATE_APPLICATIONS, message);
    };
    RabbitMQClient.prototype.pubDeleteUser = function (user) {
        var message = {
            event_name: event_name_1.EventName.DELETE_USER_EVENT,
            timestamp: new Date().toISOString(),
            user: user
        };
        return this.pub(exchange_name_1.ExchangeName.USERS, routing_keys_name_1.RoutingKeysName.DELETE_USERS, message);
    };
    RabbitMQClient.prototype.pubDeleteInstitution = function (institution) {
        var message = {
            event_name: event_name_1.EventName.DELETE_INSTITUTION_EVENT,
            timestamp: new Date().toISOString(),
            institution: institution
        };
        return this.pub(exchange_name_1.ExchangeName.INSTITUTIONS, routing_keys_name_1.RoutingKeysName.DELETE_INSTITUTIONS, message);
    };
    RabbitMQClient.prototype.subSavePhysicalActivity = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, callback);
    };
    RabbitMQClient.prototype.subUpdatePhysicalActivity = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, callback);
    };
    RabbitMQClient.prototype.subDeletePhysicalActivity = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.PHYSICAL_ACTIVITIES, routing_keys_name_1.RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, callback);
    };
    RabbitMQClient.prototype.subSaveSleep = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.SAVE_SLEEP, callback);
    };
    RabbitMQClient.prototype.subUpdateSleep = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.UPDATE_SLEEP, callback);
    };
    RabbitMQClient.prototype.subDeleteSleep = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.SLEEP, routing_keys_name_1.RoutingKeysName.DELETE_SLEEP, callback);
    };
    RabbitMQClient.prototype.subSaveWeight = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.WEIGHTS, routing_keys_name_1.RoutingKeysName.SAVE_WEIGHTS, callback);
    };
    RabbitMQClient.prototype.subDeleteWeight = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.WEIGHTS, routing_keys_name_1.RoutingKeysName.DELETE_WEIGHTS, callback);
    };
    RabbitMQClient.prototype.subSaveBodyFat = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.BODY_FATS, routing_keys_name_1.RoutingKeysName.SAVE_BODY_FATS, callback);
    };
    RabbitMQClient.prototype.subDeleteBodyFat = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.BODY_FATS, routing_keys_name_1.RoutingKeysName.DELETE_BODY_FATS, callback);
    };
    RabbitMQClient.prototype.subSaveEnvironment = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.ENVIRONMENTS, routing_keys_name_1.RoutingKeysName.SAVE_ENVIRONMENTS, callback);
    };
    RabbitMQClient.prototype.subDeleteEnvironment = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.ENVIRONMENTS, routing_keys_name_1.RoutingKeysName.DELETE_ENVIRONMENTS, callback);
    };
    RabbitMQClient.prototype.subUpdateChild = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.CHILDREN, routing_keys_name_1.RoutingKeysName.UPDATE_CHILDREN, callback);
    };
    RabbitMQClient.prototype.subUpdateFamily = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.FAMILIES, routing_keys_name_1.RoutingKeysName.UPDATE_FAMILIES, callback);
    };
    RabbitMQClient.prototype.subUpdateEducator = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.EDUCATORS, routing_keys_name_1.RoutingKeysName.UPDATE_EDUCATORS, callback);
    };
    RabbitMQClient.prototype.subUpdateHealthProfessional = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.HEALTH_PROFESSIONALS, routing_keys_name_1.RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, callback);
    };
    RabbitMQClient.prototype.subUpdateApplication = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.APPLICATIONS, routing_keys_name_1.RoutingKeysName.UPDATE_APPLICATIONS, callback);
    };
    RabbitMQClient.prototype.subDeleteUser = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.USERS, routing_keys_name_1.RoutingKeysName.DELETE_USERS, callback);
    };
    RabbitMQClient.prototype.subDeleteInstitution = function (callback) {
        return this.sub(queue_name_1.TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.INSTITUTIONS, routing_keys_name_1.RoutingKeysName.DELETE_INSTITUTIONS, callback);
    };
    RabbitMQClient.prototype.resourcePhysicalActivities = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.PHYSICAL_ACTIVITIES, listener);
    };
    RabbitMQClient.prototype.resourcePhysicalActivitiesLogs = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.PHYSICAL_ACTIVITIES_LOGS, listener);
    };
    RabbitMQClient.prototype.resourceSleep = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.SLEEP, listener);
    };
    RabbitMQClient.prototype.resourceWights = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.WEIGHTS, listener);
    };
    RabbitMQClient.prototype.resourceBodyFats = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.BODY_FATS, listener);
    };
    RabbitMQClient.prototype.resourceEnviroments = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE, exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.ENVIROMENTS, listener);
    };
    RabbitMQClient.prototype.resourceChildren = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.CHILDREN, listener);
    };
    RabbitMQClient.prototype.resourceFamilies = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.FAMILIES, listener);
    };
    RabbitMQClient.prototype.resourceFamilyChildren = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.FAMILY_CHILDREN, listener);
    };
    RabbitMQClient.prototype.resourceEducators = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.EDUCATORS, listener);
    };
    RabbitMQClient.prototype.resourceEducatorChildrenGroups = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.EDUCATORS_CILDRES_GROUPS, listener);
    };
    RabbitMQClient.prototype.resourceHealthProfessionals = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.HEALTH_PROFESSIONALS, listener);
    };
    RabbitMQClient.prototype.resourceHealthProfessionalChildrenGroups = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, listener);
    };
    RabbitMQClient.prototype.resourceApplications = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.APPLICATIONS, listener);
    };
    RabbitMQClient.prototype.resourceInstitutions = function (listener) {
        return this.resource(queue_name_1.TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE, exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.INSTITUTIONS, listener);
    };
    RabbitMQClient.prototype.getPhysicalActivities = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.PHYSICAL_ACTIVITIES, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.PHYSICAL_ACTIVITIES, [query], callback);
    };
    RabbitMQClient.prototype.getPhysicalActivitiesLogs = function (resource, date_start, date_end, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.PHYSICAL_ACTIVITIES_LOGS, [resource, date_start, date_end]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.PHYSICAL_ACTIVITIES_LOGS, [resource, date_start, date_end], callback);
    };
    RabbitMQClient.prototype.getSleep = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.SLEEP, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.SLEEP, [query], callback);
    };
    RabbitMQClient.prototype.getWeights = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.WEIGHTS, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.WEIGHTS, [query], callback);
    };
    RabbitMQClient.prototype.getBodyFats = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.BODY_FATS, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.BODY_FATS, [query], callback);
    };
    RabbitMQClient.prototype.getEnviroments = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.ENVIROMENTS, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACTIVITY, resource_name_1.ResourceName.ENVIROMENTS, [query], callback);
    };
    RabbitMQClient.prototype.getChildren = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.CHILDREN, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.CHILDREN, [query], callback);
    };
    RabbitMQClient.prototype.getFamilies = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.FAMILIES, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.FAMILIES, [query], callback);
    };
    RabbitMQClient.prototype.getFamilyChildren = function (family_id, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.FAMILY_CHILDREN, [family_id]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.FAMILY_CHILDREN, [family_id], callback);
    };
    RabbitMQClient.prototype.getEducators = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.EDUCATORS, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.EDUCATORS, [query], callback);
    };
    RabbitMQClient.prototype.getEducatorChildrenGroups = function (educator_id, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.EDUCATORS_CILDRES_GROUPS, [educator_id]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.EDUCATORS_CILDRES_GROUPS, [educator_id], callback);
    };
    RabbitMQClient.prototype.getHealthProfessionals = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.HEALTH_PROFESSIONALS, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.HEALTH_PROFESSIONALS, [query], callback);
    };
    RabbitMQClient.prototype.getHealthProfessionalChildrenGroups = function (healthprofessional_id, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, [healthprofessional_id]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, [healthprofessional_id], callback);
    };
    RabbitMQClient.prototype.getApplications = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.APPLICATIONS, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.APPLICATIONS, [query], callback);
    };
    RabbitMQClient.prototype.getInstitutions = function (query, callback) {
        if (!callback) {
            return this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.INSTITUTIONS, [query]);
        }
        this.request(exchange_name_1.ExchangeName.RPC_ACCOUNT, resource_name_1.ResourceName.INSTITUTIONS, [query], callback);
    };
    return RabbitMQClient;
}(events_1.EventEmitter));
exports.RabbitMQClient = RabbitMQClient;
