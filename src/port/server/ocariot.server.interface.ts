import { IServer } from './server.interface'

export interface IOcariotServer extends IServer{

    providePhysicalActivities(listener: (query: string) => any): any

    providePhysicalActivitiesLogs(listener: (resource: string, date_start: string, date_end: string) => any): any

    provideSleep(listener: (query: string) => any): any

    provideWights(listener: (query: string) => any): any

    provideBodyFats(listener: (query: string) => any): any

    provideEnviroments(listener: (query: string) => any): any

    provideChildren(listener: (query: string) => any): any

    provideFamilies(listener: (query: string) => any): any

    provideFamilyChildren(listener: (family_id: string) => any): any

    provideEducators(listener: (query: string) => any): any

    provideEducatorChildrenGroups(listener: (educator_id: string) => any): any

    provideHealthProfessionals(listener: (query: string) => any): any

    provideHealthProfessionalChildrenGroups(listener: (healthprofessional_id: string) => any): any

    provideApplications(listener: (query: string) => any): any

    provideInstitutions(listener: (query: string) => any): any

}
