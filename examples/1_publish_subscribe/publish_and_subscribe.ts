import { IConnectionOption, IOcariotRabbitMQClient, OcariotRabbitMQClient } from '../../index'
import { expect } from 'chai'

const options: IConnectionOption = {
    receiveFromYourself: true
}

const ocariotRabbitMQ: IOcariotRabbitMQClient = new OcariotRabbitMQClient('activity.tracking.app', {}, options)

ocariotRabbitMQ
    .subSavePhysicalActivity((message) => {
        console.log('Event received:', message)
    })
    .then(() => {
        console.log('Subscribe successfully registered!')
    })
    .catch(err => {
        console.log(`Subscribe error: ${err.message}`)
    })

ocariotRabbitMQ
    .pubSavePhysicalActivity({
        name: 'Walk',
        start_time: '2018-12-14T12:52:59Z',
        end_time: '2018-12-14T13:12:37Z',
        duration: 1178000,
        calories: 109,
        steps: 1407
    })
    .then(() => {
        console.log('Physical Activity published successfully!')
    })
    .catch(err => {
        console.log(`Error publishing Physical Activity: ${err.message}`)
    })

