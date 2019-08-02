import { RabbitMQClient } from '../../index'

const ocariot: RabbitMQClient = new RabbitMQClient('Account')

ocariot.receiveFromYourself(true)

ocariot.subSavePhysicalActivity((err, message) => {
    console.log(message)
})

ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' }).catch((err) => {
    console.log(err)
})
