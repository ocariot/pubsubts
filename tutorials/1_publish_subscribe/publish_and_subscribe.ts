import { RabbitMQClient, IConnectionOptions } from '../../index'

const options: IConnectionOptions = {
    receiveFromYourself: true
}

const ocariot: RabbitMQClient = new RabbitMQClient('Account', {}, options)

ocariot.subSavePhysicalActivity((message) => {
    console.log(message)
})

ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' }).catch((err) => {
    console.log(err)
})
