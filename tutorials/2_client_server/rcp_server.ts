import { IConnConfig, OcariotPubSub } from '../../index'

const connParams: IConnConfig = {
    host: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest'
}

const ocariot: OcariotPubSub = new OcariotPubSub('Activity')

ocariot.resourcePhysicalActivities((query: string) => {
    return query + ' PhysicalActivities Processado'
})

ocariot.resourceSleep((query: string) => {
    return query + ' Sleep Processado'
})
