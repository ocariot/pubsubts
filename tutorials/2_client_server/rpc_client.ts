import { RabbitMQClient } from '../../index'

const rabbitMQClient: RabbitMQClient = new RabbitMQClient('analytics.app',
    'amqp://guest:guest@localhost:5672')

// Promise version
// Get all children aged from 9 to 11 years
rabbitMQClient
    .getChildren('?age=gt:8&age=lte:12 ')
    .then(resource => {
        console.log('Children received (promise):', resource)
    })
    .catch((err) => {
        console.log(`Error (promise): ${err.message}`)
    })

// Callback version
// Recover all child weights from id 5d601e0775e1850012fd161a imicroservicen the period from 2019-06-07 to 2019-08-01
rabbitMQClient.getPhysicalActivities(
    '?timestamp=gte:2019-06-07&timestamp=lt:2019-08-01&child_id=5d601e0775e1850012fd161a',
    (err, resource: string) => {
        if (err) {
            console.log(`Error (callback): ${err.message}`)
            return
        }
        console.log('Physical Activities received (callback):', resource)
    }
)
