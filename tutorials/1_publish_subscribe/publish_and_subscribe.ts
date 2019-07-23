import { OcariotPubSub } from '../../index'

const ocariot: OcariotPubSub = new OcariotPubSub('Account')

ocariot.receiveFromYourself(true)

ocariot.subSavePhysicalActivity((err, message) => {
    console.log(message)
})

ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' }).catch((err) => {
    console.log(err)
})
