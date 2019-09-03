import { IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'

const rabbitMQClient: IOcariotRabbitMQClient = new OcariotRabbitMQClient('activity.tracking.app')

rabbitMQClient
    .pubSaveWeight({
        weight: {
            timestamp: '2019-06-20T14:40:00Z',
            value: 70.2,
            unit: 'kg',
            body_fat: 20.1
        }
    })
    .then(() => {
        console.log('Weight published successfully!')
    })
    .catch(err => {
        console.log(`Error publishing Weight: ${err.message}`)
    })
