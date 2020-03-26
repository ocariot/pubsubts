import { IRpcServer } from './rpc.server.interface'

export interface IOcariotRpcServer extends IRpcServer {
    providePhysicalActivities(listener: (query?: string) => any): Promise<void>

    provideLogs(listener: (childId: string, dateStart: string, dateEnd: string) => any): Promise<void>

    provideSleep(listener: (query?: string) => any): Promise<void>

    provideWeights(listener: (query?: string) => any): Promise<void>

    provideEnvironments(listener: (query?: string) => any): Promise<void>

    provideChildren(listener: (query?: string) => any): Promise<void>

    provideFamilies(listener: (query?: string) => any): Promise<void>

    provideFamilyChildren(listener: (familyId: string) => any): Promise<void>

    provideEducators(listener: (query?: string) => any): Promise<void>

    provideEducatorChildrenGroups(listener: (educatorId: string) => any): Promise<void>

    provideHealthProfessionals(listener: (query?: string) => any): Promise<void>

    provideHealthProfessionalChildrenGroups(listener: (healthProfessionalId: string) => any): Promise<void>

    provideApplications(listener: (query?: string) => any): Promise<void>

    provideInstitutions(listener: (query?: string) => any): Promise<void>

    provideEducatorsFromChild(listener: (childId: string) => any): Promise<void>

    provideHealthProfessionalsFromChild(listener: (childId: string) => any): Promise<void>

    provideFoods(listener: (childId: string, dateStart: string, dateEnd: string) => any): Promise<void>
}
