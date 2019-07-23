import { IServer } from './server.interface'

export interface IOcariotServer extends IServer{

    resourcePhysicalActivities(listener: (query: string) => any): any

    resourcePhysicalActivitiesLogs(listener: (resource: string, date_start: string, date_end: string) => any): any

    resourceSleep(listener: (query: string) => any): any

    resourceWights(listener: (query: string) => any): any

    resourceBodyFats(listener: (query: string) => any): any

    resourceEnviroments(listener: (query: string) => any): any

    resourceChildren(listener: (query: string) => any): any

    resourceFamilies(listener: (query: string) => any): any

    resourceFamilyChildren(listener: (family_id: string) => any): any

    resourceEducators(listener: (query: string) => any): any

    resourceEducatorChildrenGroups(listener: (educator_id: string) => any): any

    resourceHealthProfessionals(listener: (query: string) => any): any

    resourceHealthProfessionalChildrenGroups(listener: (healthprofessional_id: string) => any): any

    resourceApplications(listener: (query: string) => any): any

    resourceInstitutions(listener: (query: string) => any): any

}
