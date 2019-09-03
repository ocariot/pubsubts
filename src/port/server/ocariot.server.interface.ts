import { IServer } from './server.interface'

export interface IOcariotServer extends IServer {
    providePhysicalActivities(listener: (query: string) => any): Promise<void>

    provideLogs(listener: (query: string) => any): Promise<void>

    provideSleep(listener: (query: string) => any): Promise<void>

    provideWeights(listener: (query: string) => any): Promise<void>

    provideEnvironments(listener: (query: string) => any): Promise<void>

    provideChildren(listener: (query: string) => any): Promise<void>

    provideFamilies(listener: (query: string) => any): Promise<void>

    provideFamilyChildren(listener: (familyId: string) => any): Promise<void>

    provideEducators(listener: (query: string) => any): Promise<void>

    provideEducatorChildrenGroups(listener: (educatorId: string) => any): Promise<void>

    provideHealthProfessionals(listener: (query: string) => any): Promise<void>

    provideHealthProfessionalChildrenGroups(listener: (healthProfessionalId: string) => any): Promise<void>

    provideApplications(listener: (query: string) => any): Promise<void>

    provideInstitutions(listener: (query: string) => any): Promise<void>
}
