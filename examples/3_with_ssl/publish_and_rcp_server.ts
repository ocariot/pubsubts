import { IConnectionConfig, IConnectionOption, IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'
import * as fs from 'fs'

const connOptions: IConnectionOption = {
    retries: 5,
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

const ocariotRabbitMQ: IOcariotRabbitMQClient = new OcariotRabbitMQClient('activity.tracking.app', connParams, connOptions)

ocariotRabbitMQ
    .pubSavePhysicalActivity({
        id: '5d63d221fa71a1001971634a',
        start_time: '2019-06-06T15:27:46.000Z',
        end_time: '2019-06-06T15:42:18.000Z',
        duration: 872000,
        child_id: '5d601e0775e1850012fd161a',
        name: 'Outdoor Bike',
        calories: 73,
        steps: 0
    })
    .then(() => {
        console.log('Physical Activity published successfully!')
    })
    .catch((err) => {
        console.log(`Error publishing Physical Activity : ${err.message}`)
    })

ocariotRabbitMQ
    .provideEnvironments((query: string) => {
        return environments
    })
    .then(() => {
        console.log('RPC server to provide successfully initialized Environments resource.')
    })
    .catch((err) => {
        console.log(`Error initializing RPC server: ${err.message}`)
    })

const environments = [
    {
        id: '5a62be07de34500146d9c544',
        institution_id: '5a62be07de34500146d9c544',
        location: {
            local: 'Indoor',
            room: 'A101',
            latitude: -7.2100766,
            longitude: -35.9175756
        },
        measurements: [
            {
                type: 'temperature',
                value: 35.6,
                unit: '°C'
            },
            {
                type: 'humidity',
                value: 42.2,
                unit: '%'
            }
        ],
        climatized: true,
        timestamp: '2018-11-19T14:40:00Z'
    }
]
