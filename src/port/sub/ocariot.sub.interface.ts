import { ISub } from './sub.interface'
import { OcariotPubSubException } from '../../exception/ocariotPubSub.exception'

export interface IOcariotSub extends ISub {

    subSavePhysicalActivity(callback: (message: any) => void): void

    subUpdatePhysicalActivity(callback: (message: any) => void): void

    subDeletePhysicalActivity(callback: (message: any) => void): void

    subSaveSleep(callback: (message: any) => void): void

    subUpdateSleep(callback: (message: any) => void): void

    subDeleteSleep(callback: (message: any) => void): void

    subSaveEnvironment(callback: (message: any) => void): void

    subDeleteEnvironment(callback: (message: any) => void): void

    subUpdateChild(callback: (message: any) => void): void

    subUpdateFamily(callback: (message: any) => void): void

    subUpdateEducator(callback: (message: any) => void): void

    subUpdateHealthProfessional(callback: (message: any) => void): void

    subUpdateApplication(callback: (message: any) => void): void

    subDeleteUser(callback: (message: any) => void): void

    subDeleteInstitution(callback: (message: string) => void): void

}
