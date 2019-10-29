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

    pubSaveChild(child: any): Promise<void>

    pubUpdateChild(child: any): Promise<void>

    pubUpdateFamily(family: any): Promise<void>

    pubUpdateEducator(educator: any): Promise<void>

    pubUpdateHealthProfessional(healthprofessional: any): Promise<void>

    pubUpdateApplication(application: any): Promise<void>

    pubDeleteUser(user: any): Promise<void>

    pubDeleteInstitution(institution: any): Promise<void>

    pubFitbitLastSync(fitbit: any): Promise<void>

    pubFitbitAuthError(fitbit: any): Promise<void>

    pubSyncPhysicalActivity(activity: any): Promise<void>

    pubSyncSleep(sleep: any): Promise<void>

    pubSyncWeight(weight: any): Promise<void>

    pubSyncLog(log: any): Promise<void>

    pubSaveFood(food: any): Promise<void>

    pubUpdateFood(food: any): Promise<void>
}
