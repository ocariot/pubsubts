import { IClient } from './client.interface'

export interface IOcariotClient extends IClient{

    getPhysicalActivities(query: string, callback?: (err, result) => void): any

    getPhysicalActivitiesLogs(resource: string, dateStart: string, dateEnd: string, callback?: (err, result) => void): any

    getSleep(query: string, callback?: (err, result) => void): any

    getWeights(query: string, callback?: (err, result) => void): any

    getBodyFats(query: string, callback?: (err, result) => void): any

    getEnviroments(query: string, callback?: (err, result) => void): any

    getChildren(query: string, callback?: (err, result) => void): any

    getFamilies(query: string, callback?: (err, result) => void): any

    getFamilyChildren(familyId: string, callback?: (err, result) => void): any

    getEducators(query: string, callback?: (err, result) => void): any

    getEducatorChildrenGroups(educatorId: string, callback?: (err, result) => void): any

    getHealthProfessionals(query: string, callback?: (err, result) => void): any

    getHealthProfessionalChildrenGroups(healthProfessionalId: string, callback?: (err, result) => void): any

    getApplications(query: string, callback?: (err, result) => void): any

    getInstitutions(query: string, callback?: (err, result) => void): any

}
