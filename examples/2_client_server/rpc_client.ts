import { IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'

const ocariotRabbitMQ: IOcariotRabbitMQClient = new OcariotRabbitMQClient('analytics.app',
    'amqp://guest:guest@localhost:5672')

// Promise version
// Get all children aged from 9 to 11 years
ocariotRabbitMQ
    .getChildren('?age=gt:8&age=lte:12 ')
    .then(resource => {
        console.log('Children received (promise):', resource)
    })
    .catch((err) => {
        console.log(`Error (promise): ${err.message}`)
    })

// Callback version
// Recover all child physical activities from ID 5a62be07d6f33400146c9b61 recorded in the period 2019-06-07 to 2019-08-01
ocariotRabbitMQ
    .getPhysicalActivities(
        '?start_time=gte:2019-06-07&start_time=lt:2019-08-01&child_id=5a62be07d6f33400146c9b61'
    )
    .then(resource => {
        // Array containing physical activities
        console.log('Physical activities:', resource)
    })
    .catch((err) => {
        console.log(`Error querying resource: ${err.message}`)
    })
