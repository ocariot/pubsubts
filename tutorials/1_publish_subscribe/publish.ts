import { IConnConfig, OcariotPubSub } from '../../index'

const ocariot: OcariotPubSub = new OcariotPubSub('Account')

ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' }).catch((err) => {
    console.log(err)
})
