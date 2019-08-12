import { RabbitMQClient, IConnectionConfigs, IConnectionOptions } from '../../index'
import * as fs from 'fs'

const connOptions: IConnectionOptions = {
    retries: 5,
    interval: 1000,
    sslOptions: {
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

const connParams: IConnectionConfigs = {
    protocol: 'amqps',
    host: 'ip-machine',
    port: 5671,
    username: 'guest',
    password: 'guest'
}

const ocariot: RabbitMQClient = new RabbitMQClient('Account', connParams, connOptions)
