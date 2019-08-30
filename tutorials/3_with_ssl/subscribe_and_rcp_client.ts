import { RabbitMQClient, IConnectionConfigs, IConnectionOptions } from '../../index'
import * as fs from 'fs'

const connOptions: IConnectionOptions = {
    interval: 1000,
    sslOptions: {
        ca: [fs.readFileSync('./ssl/certifications/ca_certificate.pem')]
    }
}

const connParams: IConnectionConfigs = {
    protocol: 'amqps',
    hostname: 'ip-machine',
    port: 5671,
    username: 'guest',
    password: 'guest'
}

function receiveMessage(err, message: string): void {
    if (err) {
        console.log('Erro Callback: ', err)
        return
    }
    console.log('Resultado Callback: ', message)
}

const ocariot: RabbitMQClient = new RabbitMQClient('Account', connParams, connOptions)

ocariot.subSavePhysicalActivity((message) => {
    console.log(message)
})

ocariot.getPhysicalActivities('?end_at=2018-12-11&period=10d').then((message) => {
    console.log('Resultado Promise: ', message)
}).catch((err) => {
    console.log('Erro Promise: ', err)
})

ocariot.getSleep('?start_at=2017-12-24&period=1y', receiveMessage)
