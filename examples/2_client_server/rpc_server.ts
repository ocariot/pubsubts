import { IConnectionConfig, IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'

const connParams: IConnectionConfig = {
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest'
}

const ocariotRabbitMQ: IOcariotRabbitMQClient = new OcariotRabbitMQClient('microservice.app', connParams)

ocariotRabbitMQ
    .providePhysicalActivities((query: string) => {
        // Search your database using the query and return the data.
        // You can use lib https://www.npmjs.com/package/query-strings-parser
        // to handle query string for use in MongoDB queries
        return physicalActivities
    })
    .then(() => {
        console.log('RPC server to provide successfully initialized Physical Activities resource.')
    })
    .catch((err) => {
        console.log(`Error initializing RPC server: ${err.message}`)
    })

ocariotRabbitMQ
    .provideChildren((query: string) => {
        // Search your database using the query and return the data.
        // You can use lib https://www.npmjs.com/package/query-strings-parser
        // to handle query string for use in MongoDB queries
        return children
    })
    .then(() => {
        console.log('RPC server to provide successfully initialized Children resource.')
    })
    .catch((err) => {
        console.log(`Error initializing RPC server: ${err.message}`)
    })

const physicalActivities = [
    {
        id: '5d63d221fa71a100197163ce',
        start_time: '2019-06-18T11:01:51.000Z',
        end_time: '2019-06-18T11:19:46.000Z',
        duration: 1075000,
        child_id: '5d601e0775e1850012fd161a',
        name: 'Outdoor Bike',
        calories: 112,
        steps: 0,
        levels: [
            {
                name: 'sedentary',
                duration: 0
            },
            {
                name: 'lightly',
                duration: 600000
            },
            {
                name: 'fairly',
                duration: 120000
            },
            {
                name: 'very',
                duration: 360000
            }
        ],
        heart_rate: {
            average: 100,
            out_of_range_zone: {
                min: 30,
                max: 91,
                duration: 360000
            },
            fat_burn_zone: {
                min: 91,
                max: 127,
                duration: 660000
            },
            cardio_zone: {
                min: 127,
                max: 154,
                duration: 60000
            },
            peak_zone: {
                min: 154,
                max: 220,
                duration: 0
            }
        }
    },
    {
        id: '5d63d221fa71a100197163c5',
        start_time: '2019-06-17T16:15:04.000Z',
        end_time: '2019-06-17T16:41:45.000Z',
        duration: 1601000,
        child_id: '5d601e0775e1850012fd161a',
        name: 'Bike',
        calories: 121,
        steps: 0,
        levels: [
            {
                name: 'sedentary',
                duration: 420000
            },
            {
                name: 'lightly',
                duration: 600000
            },
            {
                name: 'fairly',
                duration: 360000
            },
            {
                name: 'very',
                duration: 180000
            }
        ],
        heart_rate: {
            average: 104,
            out_of_range_zone: {
                min: 30,
                max: 91,
                duration: 180000
            },
            fat_burn_zone: {
                min: 91,
                max: 127,
                duration: 1320000
            },
            cardio_zone: {
                min: 127,
                max: 154,
                duration: 0
            },
            peak_zone: {
                min: 154,
                max: 220,
                duration: 0
            }
        }
    }
]

const children = [
    {
        id: '5d67e731bf2e370012d602bc',
        username: 'BR0001',
        gender: 'male',
        age: 11,
        institution_id: '5d601ddc75e1850012fd1619',
        last_login: '2019-08-29T15:27:48.831Z',
        last_sync: ''
    },
    {
        id: '5d667d04ef99f90012641bc7',
        username: 'BR0002',
        gender: 'male',
        age: 11,
        institution_id: '5d601ddc75e1850012fd1619',
        last_login: '2019-08-28T13:13:01.794Z',
        last_sync: ''
    },
    {
        id: '5d601e0775e1850012fd161a',
        username: 'BR0003',
        gender: 'male',
        age: 9,
        institution_id: '5d601ddc75e1850012fd1619',
        last_login: '2019-08-29T21:34:16.287Z',
        last_sync: '2019-08-26T01:17:25.157Z'
    }
]
