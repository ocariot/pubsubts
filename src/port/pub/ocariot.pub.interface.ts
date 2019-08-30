import { IPub } from './pub.interface'

export interface IOcariotPub extends IPub {
    pubSavePhysicalActivity(activity: any): Promise<void>

    pubUpdatePhysicalActivity(activity: any): Promise<void>

    pubDeletePhysicalActivity(activity: any): Promise<void>

    pubSaveSleep(sleep: any): Promise<void>

    pubUpdateSleep(sleep: any): Promise<void>

    pubDeleteSleep(sleep: any): Promise<void>

    pubSaveWeight(weight: any): Promise<void>

    pubDeleteWeight(weight: any): Promise<void>

    pubSaveEnvironment(environment: any): Promise<void>

    pubDeleteEnvironment(environment: any): Promise<void>

    pubSaveLog(log: any): Promise<void>

    pubUpdateChild(child: any): Promise<void>

    pubUpdateFamily(family: any): Promise<void>

    pubUpdateEducator(educator: any): Promise<void>

    pubUpdateHealthProfessional(healthprofessional: any): Promise<void>

    pubUpdateApplication(application: any): Promise<void>

    pubDeleteUser(user: any): Promise<void>

    pubDeleteInstitution(institution: any): Promise<void>

    pubFitbitLastSync(datetime: any): Promise<void>

    pubFitbitAuthError(error: any): Promise<void>
}
