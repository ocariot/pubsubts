import { RabbitMQClient } from '../../index'

const ocariot: RabbitMQClient = new RabbitMQClient('Account')

ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' }).catch((err) => {
    console.log(err)
})
