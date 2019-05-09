import { Connection } from 'amqp-ts'
import { IConnectionFactory } from './connection.factory.interface'
import { Default } from '../utils/default'

import { Configuration, Options } from './configuration.inteface'
import * as fs from "fs"


const defaultValues: Configuration = {
    vhost: Default.RABBITMQ_VHOST,
    host: Default.RABBITMQ_HOST,
    port: Default.RABBITMQ_PORT,
    username: Default.RABBITMQ_USERNAME,
    password: Default.RABBITMQ_PASSWORD,
    options: <Options> {
        retries: 0,
        interval: 1000,
        ssl: {
            enabled: false,
            ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
        }
    }
}

export class ConnectionFactoryRabbitMQ implements IConnectionFactory {

    private configuration: Configuration;
    
    constructor(host : string, port : number, username : string, password : string, options ?: Options){
        this.configuration = defaultValues;
        this.configuration.host = host;
        this.configuration.port = port;
        this.configuration.username = username;
        this.configuration.password = password;
        if(options)
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
    public async createConnection(): Promise<Connection> {
        try {
            const conn = new Connection('protocol://username:password@host:port/vhost'
                    .replace('protocol', this.configuration.options.ssl.enabled ? 'amqps':'amqps')
                    .replace('host', process.env.RABBITMQ_HOST || this.configuration.host)
                    .replace('port', (process.env.RABBITMQ_PORT || this.configuration.port).toString())
                    .replace('vhost', this.configuration.vhost)
                    .replace('username', process.env.RABBITMQ_USERNAME || this.configuration.username)
                    .replace('password', process.env.RABBITMQ_PASSWORD || this.configuration.password)
                ,
                {ca:this.configuration.options.ssl.ca}, { retries: this.configuration.options.retries, interval: this.configuration.options.interval })
            await conn.initialized
            return Promise.resolve(conn)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
