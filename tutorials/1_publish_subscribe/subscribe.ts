import { OcariotPubSub } from '../../index'

const ocariot: OcariotPubSub = new OcariotPubSub('Account')

ocariot.subSavePhysicalActivity((err, message) => {
    console.log(message)
})
