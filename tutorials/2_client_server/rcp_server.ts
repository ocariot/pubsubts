import { IConnectionConfigs, RabbitMQClient } from '../../index'

const connParams: IConnectionConfigs = {
    host: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest'
}

const ocariot: RabbitMQClient = new RabbitMQClient('Activity')

ocariot.resourcePhysicalActivities((query: string) => {
    return query + ' PhysicalActivities Processado'
})

ocariot.resourceSleep((query: string) => {
    return query + ' Sleep Processado'
})
