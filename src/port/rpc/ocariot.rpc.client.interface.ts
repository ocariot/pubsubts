import { IRpcClient } from './rpc.client.interface'

export interface IOcariotRpcClient extends IRpcClient {
    getPhysicalActivities(query: string, callback: (err, result) => void): void

    getPhysicalActivities(query?: string): Promise<any>

    getSleep(query: string, callback: (err, result) => void): void

    getSleep(query?: string): Promise<any>

    getWeights(query: string, callback: (err, result) => void): void

    getWeights(query?: string): Promise<any>

    getEnvironments(query: string, callback: (err, result) => void): void

    getEnvironments(query?: string): Promise<any>

    getLogs(childId: string, dateStart: string, dateEnd: string, callback: (err, result) => void): void

    getLogs(childId: string, dateStart: string, dateEnd: string): Promise<any>

    getChildren(query: string, callback: (err, children) => void): void

    getChildren(query?: string): Promise<any>

    getFamilies(query: string, callback: (err, families) => void): void

    getFamilies(query?: string): Promise<any>

    getFamilyChildren(familyId: string, callback: (err, children) => void): void

    getFamilyChildren(familyId: string): Promise<any>

    getEducators(query: string, callback: (err, educators) => void): void

    getEducators(query?: string): Promise<any>

    getEducatorChildrenGroups(educatorId: string, callback: (err, childrenGroups) => void): void

    getEducatorChildrenGroups(educatorId: string): Promise<any>

    getHealthProfessionals(query: string, callback: (err, healthProfessionals) => void): void

    getHealthProfessionals(query?: string): Promise<any>

    getHealthProfessionalChildrenGroups(healthProfessionalId: string, callback: (err, childrenGroups) => void): void

    getHealthProfessionalChildrenGroups(healthProfessionalId: string): Promise<any>

    getApplications(query: string, callback: (err, applications) => void): void

    getApplications(query?: string): Promise<any>

    getInstitutions(query: string, callback: (err, institutions) => void): void

    getInstitutions(query?: string): Promise<any>

    getFoods(childId: string, dateStart: string, dateEnd: string): Promise<any>
}
