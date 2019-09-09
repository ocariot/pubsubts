import { IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'

const ocariotRabbitMQ: IOcariotRabbitMQClient = new OcariotRabbitMQClient('analytics.app')

ocariotRabbitMQ
    .subSaveWeight((message) => {
        console.log(message)
    })
    .then(() => {
        console.log(`Sub in SaveWeights  successfully registered!`)
    })
    .catch(err => {
        console.log(`Sub error: ${err.message}`)
    })
