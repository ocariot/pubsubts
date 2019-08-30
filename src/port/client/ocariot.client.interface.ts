import { IClient } from './client.interface'

export interface IOcariotClient extends IClient {
    getPhysicalActivities(query: string, callback?: (err, result) => void): any

    getSleep(query: string, callback?: (err, result) => void): any

    getWeights(query: string, callback?: (err, result) => void): any

    getEnvironments(query: string, callback?: (err, result) => void): any

    getLogs(query: string, callback?: (err, result) => void): any

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
