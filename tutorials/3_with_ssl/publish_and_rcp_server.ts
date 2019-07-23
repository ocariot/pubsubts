import { OcariotPubSub, IConnConfig, IConnOpt } from 'ocariot-pubsubjs'

const connOptions: IConnOpt = {
    retries: 5,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: './ssl/certifications/ca_certificate.pem'
    }
}

const connParams: IConnConfig = {
    host: 'ip-machine',
    port: 5671,
    username: 'guest',
    password: 'guest'
}

const ocariot: OcariotPubSub = new OcariotPubSub('Account', connParams, connOptions)
