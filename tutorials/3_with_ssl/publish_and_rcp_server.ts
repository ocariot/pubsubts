import { RabbitMQClient, IConnectionConfigs, IConnOpt } from '../../index'

const connOptions: IConnOpt = {
    retries: 5,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: './ssl/certifications/ca_certificate.pem'
    }
}

const connParams: IConnectionConfigs = {
    host: 'ip-machine',
    port: 5671,
    username: 'guest',
    password: 'guest'
}

const ocariot: RabbitMQClient = new RabbitMQClient('Account', connParams, connOptions)
