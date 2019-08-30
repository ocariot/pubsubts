import { IConnectionConfigs, RabbitMQClient } from '../../index'

const connParams: IConnectionConfigs = {
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest'
}

const ocariot: RabbitMQClient = new RabbitMQClient('activity.app', connParams)

ocariot.providePhysicalActivities((query: string) => {
    return query + ' PhysicalActivities Processado'
})

ocariot.provideSleep((query: string) => {
    return query + ' Sleep Processado'
})
