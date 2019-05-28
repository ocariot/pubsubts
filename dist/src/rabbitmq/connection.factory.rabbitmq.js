"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_ts_1 = require("amqp-ts");
const fs = __importStar(require("fs"));
const defaultValues = {
    vhost: 'ocariot',
    host: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    options: {
        retries: 0,
        interval: 1000,
        ssl: {
            enabled: false,
            ca: undefined
        }
    }
};
class ConnectionFactoryRabbitMQ {
    constructor(host, port, username, password, options) {
        this.configuration = defaultValues;
        this.configuration.host = host;
        this.configuration.port = port;
        this.configuration.username = username;
        this.configuration.password = password;
        if (options)
            this.configuration.options = options;
    }
    /**
     * Create instance of {@link Connection} Class belonging
     * to the amqp-ts library to connect to RabbitMQ.
     *
     * @param _retries Total attempts to be made until give up reconnecting
     * @param _interval Interval in milliseconds between each attempt
     * @return Promise<Connection>
     */
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = new amqp_ts_1.Connection('protocol://username:password@host:port/vhost'
                    .replace('protocol', this.configuration.options.ssl.enabled ? 'amqps' : 'amqp')
                    .replace('host', process.env.RABBITMQ_HOST || this.configuration.host)
                    .replace('port', (process.env.RABBITMQ_PORT || this.configuration.port).toString())
                    .replace('vhost', process.env.RABBITMQ_PORT || this.configuration.vhost)
                    .replace('username', process.env.RABBITMQ_USERNAME || this.configuration.username)
                    .replace('password', process.env.RABBITMQ_PASSWORD || this.configuration.password), { ca: fs.readFileSync(this.configuration.options.ssl.ca) }, { retries: this.configuration.options.retries, interval: this.configuration.options.interval });
                yield conn.initialized;
                return Promise.resolve(conn);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
}
exports.ConnectionFactoryRabbitMQ = ConnectionFactoryRabbitMQ;
