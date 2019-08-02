import { RabbitMQClient } from '../../index'

const ocariot: RabbitMQClient = new RabbitMQClient('Account')

ocariot.subSavePhysicalActivity((err, message) => {
    console.log(message)
})
