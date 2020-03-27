# Changelog
All notable changes to this project will be documented in this file.

--------
## v1.5.1 (2020-03-27)
### Fixed
 - Corrects `IOcariotRpcClient` interface by adding missing methods.
 
## v1.5.0 (2020-03-26)
### Added
 - `provideEducatorsFromChild(listener: (childId: string) => any): Promise<void>`
 - `provideHealthProfessionalsFromChild(listener: (childId: string) => any): Promise<void>`
 - `getEducatorsFromChild(childId: string): Promise<any>`
 - `getHealthProfessionalsFromChild(childId: string): Promise<any>`
 
## v1.4.0 (2019-11-25)
### Added
 - `pubFitbitRevoke(fitbit: any): Promise<void>`
 - `subFitbitRevoke(callback: (message: any) => void): Promise<void>`
   
## v1.3.0 (2019-10-29)
### Added
 - Functions for publish Food Tracking Service related events:
   - `pubSaveFood(food: any): Promise<void>`
   - `pubUpdateFood(food: any): Promise<void>`

 - Functions for subscribe Food Tracking Service related events:
   - `subSaveFood(callback: (message: any) => void): Promise<void>` 
   - `subUpdateFood(callback: (message: any) => void): Promise<void>`
  
 - Functions for providing Food Tracking Service related resource (RPC Server):
   - `provideFoods(listener: (childId: string, dateStart: string, dateEnd: string) => any): Promise<void>`
   
 - Functions for querying resources related to the Food Tracking Service (RPC Client):
   - `getFoods(childId: string, dateStart: string, dateEnd: string): Promise<any>`
   
## v1.2.0 (2019-10-18)
### Added
 - Updated RPC Server and RPC Client:
   - `getLogs(childId: string, query?: string): Promise<any>` to `getLogs(childId: string, dateStart: string, dateEnd: string): Promise<any>`;
   - `provideLogs(childId: string, query?: string): Promise<void>` to `provideLogs(childId: string, dateStart: string, dateEnd: string): Promise<void>`.

## v1.1.0 (2019-10-17)
### Added
 - Functions for publish Data Sync Agent related events:
   - `pubSyncPhysicalActivity(activity: any): Promise<void>`
   - `pubSyncSleep(sleep: any): Promise<void>`
   - `pubSyncWeight(weight: any): Promise<void>`
   - `pubSyncLog(log: any): Promise<void>`

 - Functions for subscribe Data Sync Agent related events:
   - `subFitbitAuthError(callback: (message: any) => void): Promise<void>`
   - `subSyncPhysicalActivity(callback: (message: any) => void): Promise<void>`
   - `subSyncSleep(callback: (message: any) => void): Promise<void>`
   - `subSyncWeight(callback: (message: any) => void): Promise<void>`
   - `subSyncLog(callback: (message: any) => void): Promise<void>`

 - Updated RPC Server and Client Roles:
   - Changed `getLogs(query: string): Promise<any>` to `getLogs(childId: string, query?: string): Promise<any>`;
   - Now `query` parameter on all server and client functions is optional.

### Fixed
- Fixed RPC client listener that was not invalidating connection objects when it is closed.

## v1.0.5 (2019-09-30)
### Fixed
- Fixed bug that did not remove events when close method was called;
- Updated version of amqp-client-node library to ^1.0.8.

## v1.0.4 (2019-09-09)
### Fixed
- Fixed bug in pubSaveChild. The event was being published with the pubUpdateChild event routing key.

## v1.0.3 (2019-09-09)
### Added
- Class for initialization of configurations.

- Function for custom event publish:
  - `pub(routingKey: string, body: any): Promise<void>`
  
- Functions for publish Account Service related events:
  - `pubSaveChild(child: any): Promise<void>`
  - `pubUpdateChild(child: any): Promise<void>`
  - `pubUpdateFamily(family: any): Promise<void>`
  - `pubUpdateEducator(educator: any): Promise<void>`
  - `pubUpdateHealthProfessional(healthprofessional: any): Promise<void>`
  - `pubUpdateApplication(application: any): Promise<void>`
  - `pubDeleteUser(user: any): Promise<void>`
  - `pubDeleteInstitution(institution: any): Promise<void>`
  
- Functions for publish Activity Tracking Service related events:
  - `pubSavePhysicalActivity(activity: any): Promise<void>`
  - `pubUpdatePhysicalActivity(activity: any): Promise<void>`
  - `pubDeletePhysicalActivity(activity: any): Promise<void>`
  - `pubSaveSleep(sleep: any): Promise<void>`
  - `pubUpdateSleep(sleep: any): Promise<void>`
  - `pubDeleteSleep(sleep: any): Promise<void>`
  - `pubSaveWeight(weight: any): Promise<void>`
  - `pubDeleteWeight(weight: any): Promise<void>`
  - `pubSaveEnvironment(environment: any): Promise<void>`
  - `pubDeleteEnvironment(environment: any): Promise<void>`
  - `pubSaveLog(log: any): Promise<void>`
  
- Functions for publish Data Sync Agent service related events:
  - `pubFitbitLastSync(fitbit: any): Promise<void>`
  - `pubFitbitAuthError(fitbit: any): Promise<void>`

- Function for custom event subscribe:
  - `sub(routingKey: string, callback: (message: any) => void): Promise<void>`
  
- Functions for subscribe Account Service related events:
  - `subSaveChild(callback: (message: any) => void): Promise<void>`
  - `subUpdateChild(callback: (message: any) => void): Promise<void>`
  - `subUpdateFamily(callback: (message: any) => void): Promise<void>`
  - `subUpdateEducator(callback: (message: any) => void): Promise<void>`
  - `subUpdateHealthProfessional(callback: (message: any) => void): Promise<void>`
  - `subUpdateApplication(callback: (message: any) => void): Promise<void>`
  - `subDeleteUser(callback: (message: any) => void): Promise<void>`
  - `subDeleteInstitution(callback: (message: any) => void): Promise<void>`
  
- Functions for subscribe Activity Tracking Service related events:
  - `subSavePhysicalActivity(callback: (message: any) => void): Promise<void>`
  - `subUpdatePhysicalActivity(callback: (message: any) => void): Promise<void>`
  - `subDeletePhysicalActivity(callback: (message: any) => void): Promise<void>`
  - `subSaveSleep(callback: (message: any) => void): Promise<void>`
  - `subUpdateSleep(callback: (message: any) => void): Promise<void>`
  - `subDeleteSleep(callback: (message: any) => void): Promise<void>`
  - `subSaveWeight(callback: (message: any) => void): Promise<void>`
  - `subDeleteWeight(callback: (message: any) => void): Promise<void>`
  - `subSaveEnvironment(callback: (message: any) => void): Promise<void>`
  - `subDeleteEnvironment(callback: (message: any) => void): Promise<void>`
  - `subSaveLog(callback: (message: any) => void): Promise<void>`

- Functions for subscribe Data Sync Agent service related events:
  - `subFitbitLastSync(callback: (message: any) => void): Promise<void>`
  - `subFitbitAuthError(callback: (message: any) => void): Promise<void>`
  
- Adding Events to listen for connection status:
  - PUBLISH CONNECTION
    - sub_disconnected
    - sub_reconnected
    - sub_trying_connection
    - sub_connection_error
  - SUBSCRIBE CONNECTION
    - pub_disconnected
    - pub_reconnected
    - pub_trying_connection
    - pub_connection_error
  - RPC SERVER CONNECTION (Resource Provide)
    - rpc_server_disconnected
    - rpc_server_reconnected
    - rpc_server_trying_connection
    - rpc_server_connection_error    
  - RPC CLIENT CONNECTION  (Resource Query)
    - rpc_client_disconnected
    - rpc_client_reconnected
    - rpc_client_trying_connection
    - rpc_client_connection_error
    
- Function to enable logs: `logger(level: string, moduleName?: string): void`.

- Function to close all open connections: `close(): Promise<void>`.
    


