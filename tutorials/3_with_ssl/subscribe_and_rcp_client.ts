import { IConnectionConfig, IConnectionOption, IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'
import * as fs from 'fs'

const connOptions: IConnectionOption = {
    interval: 1000,
    sslOptions: {
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

const connParams: IConnectionConfig = {
    protocol: 'amqps',
    hostname: 'localhost',
    port: 5671,
    username: 'guest',
    password: 'guest'
}

const rabbitMQClient: IOcariotRabbitMQClient = new OcariotRabbitMQClient('account.app', connParams, connOptions)

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
