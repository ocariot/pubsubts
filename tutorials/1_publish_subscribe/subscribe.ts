import { RabbitMQClient } from '../../index'

const ocariot: RabbitMQClient = new RabbitMQClient('Account')

ocariot.subSavePhysicalActivity((message) => {
    console.log(message)
})
