import { ISub } from './sub.interface'

export interface IOcariotSub extends ISub {

    subSavePhysicalActivity(callback: (message: any) => void): Promise<void>

    subUpdatePhysicalActivity(callback: (message: any) => void): Promise<void>

    subDeletePhysicalActivity(callback: (message: any) => void): Promise<void>

    subSaveSleep(callback: (message: any) => void): Promise<void>

    subUpdateSleep(callback: (message: any) => void): Promise<void>

    subDeleteSleep(callback: (message: any) => void): Promise<void>

    subSaveWeight(callback: (message: any) => void): Promise<void>

    subDeleteWeight(callback: (message: any) => void): Promise<void>

    subSaveBodyFat(callback: (message: any) => void): Promise<void>

    subDeleteBodyFat(callback: (message: any) => void): Promise<void>

    subSaveEnvironment(callback: (message: any) => void): Promise<void>

    subDeleteEnvironment(callback: (message: any) => void): Promise<void>

    subUpdateChild(callback: (message: any) => void): Promise<void>

    subUpdateFamily(callback: (message: any) => void): Promise<void>

    subUpdateEducator(callback: (message: any) => void): Promise<void>

    subUpdateHealthProfessional(callback: (message: any) => void): Promise<void>

    subUpdateApplication(callback: (message: any) => void): Promise<void>

    subDeleteUser(callback: (message: any) => void): Promise<void>

    subDeleteInstitution(callback: (message: any) => void): Promise<void>

}
