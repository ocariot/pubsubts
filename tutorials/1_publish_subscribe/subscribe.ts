import { IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'

const rabbitMQClient: IOcariotRabbitMQClient = new OcariotRabbitMQClient('analytics.app')

rabbitMQClient
    .subSaveWeight((message) => {
        console.log(message)
    })
    .then(() => {
        console.log(`Sub in SaveWeights  successfully registered!`)
    })
    .catch(err => {
        console.log(`Sub error: ${err.message}`)
    })
