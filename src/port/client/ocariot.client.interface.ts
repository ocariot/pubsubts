import { IClient } from './client.interface'

export interface IOcariotClient extends IClient{

    getPhysicalActivities(query: string, callback?: (err, result) => any): any

    getPhysicalActivitiesLogs(resource: string, date_start: number, date_end: number, callback?: (err, result) => any): any

    getSleep(query: string, callback?: (err, result) => any): any

    getWeights(query: string, callback?: (err, result) => any): any

    getBodyFats(query: string, callback?: (err, result) => any): any

    getEnviroments(query: string, callback?: (err, result) => any): any

    getChildren(query: string, callback?: (err, result) => any): any

    getFamilies(query: string, callback?: (err, result) => any): any

    getFamilyChildren(family_id: number, callback?: (err, result) => any): any

    getEducators(query: string, callback?: (err, result) => any): any

    getEducatorChildrenGroups(educator_id: number, callback?: (err, result) => any): any

    getHealthProfessionals(query: string, callback?: (err, result) => any): any

    getHealthProfessionalChildrenGroups(healthprofessional_id: number, callback?: (err, result) => any): any

    getApplications(query: string, callback?: (err, result) => any): any

    getInstitutions(query: string, callback?: (err, result) => any): any

}
