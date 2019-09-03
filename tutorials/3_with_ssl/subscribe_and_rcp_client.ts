import { IConnectionConfigs, IConnectionOptions, RabbitMQClient } from '../../index'
import * as fs from 'fs'

const connOptions: IConnectionOptions = {
    interval: 1000,
    sslOptions: {
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

const connParams: IConnectionConfigs = {
    protocol: 'amqps',
    hostname: 'localhost',
    port: 5671,
    username: 'guest',
    password: 'guest'
}

const rabbitMQClient: RabbitMQClient = new RabbitMQClient('account.app', connParams, connOptions)

rabbitMQClient
    .subSavePhysicalActivity((message) => {
        console.log(message)
    })
    .then(() => {
        console.log(`Sub in SavePhysicalActivity successfully registered!`)
    })
    .catch(err => {
        console.log(`Sub error: ${err.message}`)
    })

rabbitMQClient
    .getEnvironments('?end_at=2018-12-11&period=10d')
    .then(resource => {
        console.log('Environments received:', resource)
    })
    .catch((err) => {
        console.log(`Error (promise): ${err.message}`)
    })
