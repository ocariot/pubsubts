# RabbitMQ Client Node
Library for publish and subscribe events on the OCARIoT platform message bus.

### Table of Contents
- [Message Bus Configuration](#message-bus-configuration)
- [Installation](#installation)
- [Synopsis](#synopsis)
- [Connection](#connection)
- [Close](#close)
- [Publish Message](#publish-message)
  - [Publish General Message](#publish-general-message)
  - [Publish Activity Message](#publish-activity-message)
  - [Publish Account Message](#publish-account-message)
- [Subscribe Message](#subscribe-message)
  - [General Resource Provider](#subscribe-general-message)
  - [Account Microservice Resource Provider](#subscribe-activity-message)
  - [Activity Microservice Resource Provider](#subscribe-account-message)
- [Resource Provider](#resource-provider)
  - [General Resource Provider](#general-resource-provider)
  - [Account Microservice Resource Provider](#account-microservice-resource-provider)
  - [Activity Microservice Resource Provider](#activity-microservice-resource-provider)
- [Resource Requester](#resource-requester)
  - [General Resource Requester](#general-resource-requester)
  - [Account Microservice Resource Requester](#account-microservice-resource-requester)
  - [Activity Microservice Resource Requester](#activity-microservice-resource-requester)
- [Logs Emission Manager](#logs-emission-manager)
- [Events](#events)

### Message Bus Configuration

### Installation

    npm install ocariot-pubsubjs
  
### Synopsis
Example an application using the library *ocariot-pubsubjs*:
```TypeScript
import { RabbitMQClient, IConnectionOptions } from '../../index'

const options: IConnectionOptions = {
    receiveFromYourself: true
}

const ocariot: RabbitMQClient = new RabbitMQClient('Account', {}, options)

ocariot.subSavePhysicalActivity((message) => {
    console.log(message)
})

ocariot.pubSavePhysicalActivity({ activity: 'Saving Activity...' }).catch((err) => {
    console.log(err)
})

```
This application establish a connection with the Rabbit Bus through instance of class *OcariotPubSub*passing some parameters reference of the type connection. The parameters are:

- *hostname: string* - Host IP witch TCP connection will be realized. In case SSL/TLS  connection, make sure you are 
using the DNS registered in certificate, generated from Certificate Authorities.
- *port: number* - Port number that TCP connection will be realized. In default configurations utilize the port 5672 for 
connections without  SSL/TLS and 5671 for connection with SSL/TLS.
- *username: string* - Username of a user already registered in Rabbit Bus  
- *password: string* - Password of respective user informed above 
- *options: IOption* - Configurations for enable or disable SSL/TLS connection.  In addition, it is possible the maximum number of attempts that must be made to establish the connection with the bus,as well as the interval between the attempts.

After get an instance of OcariotPubBus object, some signals are registered. This signals are responsible for emitter three connection status. These are: 

- *connected: void* - It's emitted when a connection is concretized and can publish/subscribe in Rabbit Bus
- *disconnected: void* - It's emitted when a connection is closed 
- *error: void* - It's emitted when a error is registered during the connection

Once with the configurations realized, it's possible start connection with Rabbit Bus through the *connect()* method.

There are yet two features that can be enable or disable according necessity  

### Connection

In constructor is passed some informations referents to connection configuration Rabbit Bus. The parameter *options: IOption* is optinal. However, these informations are necessary to establish SSL connections,  as well define aspects during possible falls and requests to a server.

*Parameters:*

- *appName: string* - Name of the microservice that will connect to the RabbitMQ bus
- *conf: IConfig* - Mandatory configurations to establish connection with RabbitMQ bus
- *options: IOpt* - Options for enable or disable SSL/TLS connection. 
In addition, it is possible the maximum number of attempts that must be made to establish the connection with the bus, as well as the interval between the attempts  

#### IConfig

```TypeScript
    OcariotPubSub (appName: string, conf?: IConnectionConfigs, options?: IConnectionOptions)
```

*Parameters:*

- *hostname: string* - Host IP witch TCP connection will be realized. In case SSL/TLS  connection, make sure you are using the DNS registered in certificate, generated from Certificate Authorities.
- *port: number* - Port number that TCP connection will be realized. In default configurations utilize the port 5672 for connections without  SSL/TLS and 5671 for connection with SSL/TLS.
- *username: string* - Username of a user already registered in Rabbit Bus  
- *password: string* - Password of respective user informed above 

```TypeScript
    IConnectionConfigs {
        host?: string,
        port?: number,
        username?: string,
        password?: string,
    }
```
#### IOpt

Configurations for enable or disable SSL/TLS connection. In addition, it is possible the maximum number of attempts that must be made to establish the connection with the bus, as well as the interval between the attempts  

*Parameters:*

- *retries: number* - Define how many times the library will try to reconnect when connection is lost. If 0, it will try reconnect infinitely
- *interval: number* - Define the interval to try reconnect in ms 
- *enabled: boolean* - It allows the SSl configurations to be enable or disable
- *ca: string* - Define the path until the file referent th certificate authority 
    (ex: './ssl/certifications/ca_certificate.pem')
- *rcpTimeout: number* - Define the max time to wait during a request
- *receiveFromYourself: boolean* - This method is utilized to enable/disable the monitoring the published events themselves in Rabbit Bus. When actived,it's possible receive the messagens, since you have subscribed in the same event. 

```TypeScript
    IConnectionOptions {
        retries?: number // number of retries, 0 is forever
        interval?: number // retry interval in ms
        sslOptions?: ISSLOptions
        rpcTimeout?: number
        receiveFromYourself?: boolean
    }
```
---

### Close
This method is utilized to close all connections opened at once.

*Return:*
- *Promise\<boolean>* - This method will return the promise *true* if all open connections were closed, otherwise it will return *false*.


```TypeScript
    dispose(): Promise<void>
```

```TypeScript
    close(): Promise<void>
```
---

### Publish Message
This section show how to publish message in Rabbit bus. To ocariot project was defined some publish methods referent two specific microservices. Actually the two microservices supported by library are Activity and Account microservices. Beside these, it was created a general method, making possible insert others message types and to publish in bus from future microsevices (obs: To utilize the general method is necessary some type of knowledge about topic communication).    

#### Publish General Message

*Parameters:*

- *eventName: string* - Event name referente the message that will be published in bus. It's recomendable utilize camel case in the follow format: {RESOURCE}{ACTION}Event
- *exchange: string* - Name of exchange that will be created or utilized during forwarded of message to rabbitMQ bus
- *routingKey: string* - Define the rule that the exchange should follow during the message routing
- *body: any* - Message that will be forwarded to rabbitMQ bus

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if message was publish in rabbitMQ bus, 
otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

```TypeScript
    pub(exchange: string, routingKey: string,
        body: any): Promise<void>
```
#### Publish Account Message

*Parameter:*

- *\<resourceName>: any* -

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if message was publish in rabbitMQ bus,  otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

```TypeScript
    pubUpdateChild(child: any): Promise<void>

    pubUpdateFamily(family: any): Promise<void>

    pubUpdateEducator(educator: any): Promise<void>

    pubUpdateHealthProfessional(healthprofessional: any): Promise<void>

    pubUpdateApplication(application: any): Promise<void>

    pubDeleteUser(user: any): Promise<void>

    pubDeleteInstitution(institution: any): Promise<void>
```

#### Publish Activity Message

*Parameter:*

- *\<resourceName>: any* -

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if message was publish in rabbitMQ bus,  otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

```TypeScript
    pubSavePhysicalActivity(activity: any): Promise<void>

    pubUpdatePhysicalActivity(activity: any): Promise<void>

    pubDeletePhysicalActivity(activity: any): Promise<void>

    pubSaveSleep(sleep: any): Promise<void>

    pubUpdateSleep(sleep: any): Promise<void>

    pubDeleteSleep(sleep: any): Promise<void>
    
    pubSaveWeight(weight: any): Promise<void>

    pubDeleteWeight(weight: any): Promise<void>

    pubSaveBodyFat(bodyfat: any): Promise<void>

    pubDeleteBodyFat(bodyfat: any): Promise<void>

    pubSaveEnvironment(environment: any): Promise<void>

    pubDeleteEnvironment(environment: any): Promise<void>
```

### Subscribe Message

#### Subscribe General Message

*Parameters:*

- *exchange: string* - Name of exchange that will be created or utilized during forwarded of message to rabbitMQ bus
- *queue: string* - Queue name that will be receive the messages forwarded through the exchange specified
- *routingKey: string* - Define the rule that the exchange should follow during the message routing
- *callback: (message: any) => void* - Funciotn that will be executed when some message arrive in queue

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if realized subscription in rabbitMQ bus with sucess, otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

 ```TypeScript
   sub(exchange: string, queue: string, routingKey: string,
        callback: (message: any) => void): Promise<void>
```

#### Subscribe Account Message

*Parameter:*

- *callback: (message: any) => void* -

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if realized subscription in rabbitMQ bus with sucess, otherwise will be return false. In error case, will return a exception of type OcariotPubSubException


```TypeScript
    subUpdateChild(callback: (message: any) => void): Promise<void>

    subUpdateFamily(callback: (message: any) => void): Promise<void>

    subUpdateEducator(callback: (message: any) => void): Promise<void>

    subUpdateHealthProfessional(callback: (message: any) => void): Promise<void>

    subUpdateApplication(callback: (message: any) => void): Promise<void>

    subDeleteUser(callback: (message: any) => void): Promise<void>

    subDeleteInstitution(callback: (message: string) => void): Promise<void>
```

#### Subscribe Activity Message

*Parameter:*

- *callback: (message: any) => void* -

*Return:*

- *Promise<void>* -  It will return true if realized subscription in rabbitMQ bus with sucess, otherwise will be return false. In error case, will return a exception of type OcariotPubSubException


```TypeScript
    subSavePhysicalActivity(callback: (message: any) => void): Promise<void>

    subUpdatePhysicalActivity(callback: (message: any) => void): Promise<void>

    subDeletePhysicalActivity(callback: (message: any) => void): Promise<void>

    subSaveSleep(callback: (message: any) => void): Promise<void>

    subUpdateSleep(callback: (message: any) => void): Promise<void>

    subDeleteSleep(callback: (message: any) => void): Promise<void>
    
    subSaveWeight(callback: (message: any) => void): Promise<void>

    subDeleteWeight(callback: (message: any) => void): Promise<void>

    subSaveBodyFat(callback: (message: any) => void): Promise<void>

    subDeleteBodyFat(callback: (message: any) => void): Promise<void>

    subSaveEnvironment(callback: (message: any) => void): Promise<void>

    subDeleteEnvironment(callback: (message: any) => void): Promise<void>
```
---

### Resource Provider

#### General Resource Provider

```TypeScript
    provide(name: string, func: (...any) => any): void
```

#### Account Microservice Resource Provider

```TypeScript
    providePhysicalActivities(listener: (query: string) => any): any

    providePhysicalActivitiesLogs(listener: (resource: string, date_start: string, date_end: string) => any): any

    provideSleep(listener: (query: string) => any): any

    provideWights(listener: (query: string) => any): any

    provideBodyFats(listener: (query: string) => any): any

    provideEnviroments(listener: (query: string) => any): any
```

#### Activity Microservice Resource Provider

```TypeScript
    provideChildren(listener: (query: string) => any): any

    provideFamilies(listener: (query: string) => any): any

    provideFamilyChildren(listener: (family_id: string) => any): any

    provideEducators(listener: (query: string) => any): any

    provideEducatorChildrenGroups(listener: (educator_id: string) => any): any

    provideHealthProfessionals(listener: (query: string) => any): any

    provideHealthProfessionalChildrenGroups(listener: (healthprofessional_id: string) => any): any

    provideApplications(listener: (query: string) => any): any

    provideInstitutions(listener: (query: string) => any): any
```

---
### Resource Requester

#### General Resource Requester

##### Version Callback

```TypeScript
    getResource(name: string, params: any[], callback: (...any) => any): void
```

##### Version Promise
```TypeScript
    getResource(name: string, params: any[]): Promise<any>
```

#### Account Microservice Resource Requester

##### Version Callback

```TypeScript
    getChildren(query: string, callback: (err, result) => any): void

    getFamilies(query: string, callback: (err, result) => any): void

    getFamilyChildren(family_id: number, callback: (err, result) => any): void

    getEducators(query: string, callback: (err, result) => any): void

    getEducatorChildrenGroups(educator_id: number, callback: (err, result) => any): void

    getHealthProfessionals(query: string, callback: (err, result) => any): void

    getHealthProfessionalChildrenGroups(healthprofessional_id: number, callback: (err, result) => any): void

    getApplications(query: string, callback: (err, result) => any): void

    getInstitutions(query: string, callback: (err, result) => any): void
```

##### Version Promise

```TypeScript

    getChildren(query: string): Promise<any>

    getFamilies(query: string): Promise<any>

    getFamilyChildren(family_id: number): Promise<any>

    getEducators(query: string): Promise<any>

    getEducatorChildrenGroups(educator_id: number): Promise<any>

    getHealthProfessionals(query: string): Promise<any>

    getHealthProfessionalChildrenGroups(healthprofessional_id: number): Promise<any>

    getApplications(query: string): Promise<any>

    getInstitutions(query: string): Promise<any>


```

#### Activity Microservice Resource Requester

##### Version Callback

```TypeScript
    getPhysicalActivities(query: string, callback: (err, result) => any): void

    getPhysicalActivitiesLogs(resource: string, date_start: number, date_end: number, callback: (err, result) => any): void

    getSleep(query: string, callback: (err, result) => any): void

    getWeights(query: string, callback: (err, result) => any): void

    getBodyFats(query: string, callback: (err, result) => any): void

    getEnviroments(query: string, callback: (err, result) => any): void 
```

##### Version Promise

```TypeScript
    getPhysicalActivities(query: string): Promise<any>

    getPhysicalActivitiesLogs(resource: string, date_start: number, date_end: number): Promise<any>

    getSleep(query: string): Promise<any>

    getWeights(query: string): Promise<any>

    getBodyFats(query: string): Promise<any>

    getEnviroments(query: string): Promise<any>  
```

---
###  Events
```TypeScript
    #on('pub_connected', function() {...})
   
    #on('sub_connected', function() {...})
   
    #on('rpc_client_connected', function() {...})
   
    #on('rpc_server_connected', function() {...})
```
These events are emitted when a connection is concretized, making possible utilize the methods referents client/server and publish/subscribe in Rabbit Bus.
```TypeScript
    #on('pub_disconnected', function() {...})

    #on('sub_disconnected', function() {...})

    #on('rpc_client_disconnected', function() {...})

    #on('rpc_server_disconnected', function() {...})
```
These events are emitted when a connection is closed, after calling the [close method](#events). 
```TypeScript
    #on('pub_lost_connection', function() {...})

    #on('sub_lost_connection', function() {...})

    #on('rpc_client_lost_connection', function() {...})

    #on('rpc_server_lost_connection', function() {...})
```
These events are emitted when the respective connection is lost and before attempting to re-establish the connection.
```TypeScript  
    #on('pub_trying_connection', function() {...})
   
    #on('sub_trying_connection', function() {...})
   
    #on('rpc_client_trying_connection', function() {...})
   
    #on('rpc_server_trying_connection', function() {...})
```
These events are emitted during the time that try re-establish the connection.
```TypeScript
    #on('pub_reconnected', function() {...})

    #on('sub_reconnected', function() {...})

    #on('rpc_client_reconnected', function() {...})

    #on('rpc_server_reconnected', function() {...})
```
These events are emitted when the respective connection is re-established.
```TypeScript
    #on('pub_connection_error', function(err) {...})

    #on('sub_connection_error', function(err) {...})

    #on('rpc_client_connection_error', function(err) {...})

    #on('rpc_server_connection_error', function(err) {...})
```
These events are emitted when a error is registered during the connection.

---

###  Logs Emission Manager

This method is utilize to visualize logs emitted during the processing of library. It can be enable/disable through the following parameters: 

*Parameter:*
- *level: string* - This parameter has to be one of the options:  **'warn'**, **'error'** or **'info'**. The default level is **'info'**

*Return:*
- *boolean* - This method will return *true* if the operation was actived, otherwise it will return *false*

```TypeScript
    logger(level: string): boolean
```
