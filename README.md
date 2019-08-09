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
  - [Receive Yourself Message](#receive-yourself-message)
- [Subscribe Message](#subscribe-message)
  - [Subscribe General Message](#subscribe-general-message)
  - [Subscribe Activity Message](#subscribe-activity-message)
  - [Subscribe Account Message](#subscribe-account-message)
- [Logs Emission Manager](#logs-emission-manager)
- [Events](#events)

### Message Bus Configuration

### Installation

    npm install ocariot-pubsubjs
  
### Synopsis
Example an application using the library *ocariot-pubsubjs*:
```TypeScript
const options: IOptions = {
    retries: 1,
    interval: 1000,
    ssl: {
        enabled: true,
        ca: './ssl/certifications/ca_certificate.pem'
    }
}

let pubsub : OcariotPubSub = new OcariotPubSub('ip-machine', 5671, 'guest', 'guest', options);

pubsub.on('connected', async () => {
    console.log("Connected")

    await pubsub.sub("physicalactivities", "ocariot-activity-service", "physicalactivities.save", receiveMessage)

    await pubsub.subUpdatePhysicalActivity(receiveUpdatePhysicalActivity)

    setTimeout(async () => {

        await pubsub.pubSavePhysicalActivity({ mesage: "I'am Save here" })

        await pubsub.pub("physicalactivities", "physicalactivities.update", { mesage: "I'am Update here" })

    },3000)
})

pubsub.on('disconnected', () => {
    console.log("disconnected")
})

pubsub.on('error', () => {
    console.log("Connection Error")
})

pubsub.connect().catch(err => {
    console.log(err)
})

pubsub.receiveFromYourself(true)
pubsub.logger(true,'info')
```
This application establish a connection with the Rabbit Bus through instance of class *OcariotPubSub* 
passing some parameters reference of the type connection. The parameters are:

- *hostname: string* - Host IP witch TCP connection will be realized. In case SSL/TLS  connection, make sure you are 
using the DNS registered in certificate, generated from Certificate Authorities.
- *port: number* - Port number that TCP connection will be realized. In default configurations utilize the port 5672 for 
connections without  SSL/TLS and 5671 for connection with SSL/TLS.
- *username: string* - Username of a user already registered in Rabbit Bus  
- *password: string* - Password of respective user informed above 
- *options: IOption* - Configurations for enable or disable SSL/TLS connection. 
In addition, it is possible the maximum number of attempts that must be made to establish the connection with the bus, 
as well as the interval between the attempts  

After get an instance of OcariotPubBus object, some signals are registered. This signals are responsible for emitter 
three connection status. These are: 

- *connected: void* - It's emitted when a connection is concretized and can publish/subscribe in Rabbit Bus
- *disconnected: void* - It's emitted when a connection is closed 
- *error: void* - It's emitted when a error is registered during the connection

Once with the configurations realized, it's possible start connection with Rabbit Bus through the *connect()* method.

There are yet two features that can be enable or disable according necessity  

### Connection

In constructor is passed some informations referents to connection configuration Rabbit Bus. The parameter 
*options: IOption* is optinal. However, these informations are necessary to establish SSL connections, 
as well define aspects during possible falls and requests to a server.

*Parameters:*

- *appName: string* - Name of the microservice that will connect to the RabbitMQ bus
- *conf: IConfig* - Mandatory configurations to establish connection with RabbitMQ bus
- *options: IOpt* - Options for enable or disable SSL/TLS connection. 
In addition, it is possible the maximum number of attempts that must be made to establish the connection with the bus, 
as well as the interval between the attempts  

#### IConfig

```TypeScript
    OcariotPubSub (appName: string, conf: IConfig, options?: IOpt)
```

*Parameters:*

- *hostname: string* - Host IP witch TCP connection will be realized. In case SSL/TLS  connection, make sure you are 
using the DNS registered in certificate, generated from Certificate Authorities.
- *port: number* - Port number that TCP connection will be realized. In default configurations utilize the port 5672 for 
connections without  SSL/TLS and 5671 for connection with SSL/TLS.
- *username: string* - Username of a user already registered in Rabbit Bus  
- *password: string* - Password of respective user informed above 


    IConfig{
        host: string,
        port: number,
        username: string,
        password: string,
    }

#### IOpt

Configurations for enable or disable SSL/TLS connection. 
In addition, it is possible the maximum number of attempts that must be made to establish the connection with the bus, 
as well as the interval between the attempts  

*Parameters:*

- *retries: number* - Define how many times the library will try to reconnect when connection is lost. If 0, it will try reconnect infinitely
- *interval: number* - Define the interval to try reconnect in ms 
- *enabled: boolean* - It allows the SSl configurations to be enable or disable
- *ca: string* - Define the path until the file referent th certificate authority 
    (ex: './ssl/certifications/ca_certificate.pem')
- *rcpTimeout: number* - Define the max time to wait during a request


    IOpt {
        retries: number // number of retries, 0 is forever
        interval: number // retry interval in ms
        ssl: {
            enabled: boolean,
            ca: string
        }
        rcpTimeout: number
    }

---

### Close
This method is utilized to close all connections opened at once.

*Return:*
- *Promise\<boolean>* - This method will return the promise *true* if all open connections were closed, 
otherwise it will return *false*.


```TypeScript
    dispose(): Promise<boolean>
```
---

### Publish Message
This section show how to publish message in Rabbit bus. To ocariot project was defined some publish 
methods referent two specific microservices. Actually the two microservices supported by library are 
Activity and Account microservices. Beside these, it was created a general method, making possible insert 
others message types and to publish in bus from future microsevices (obs: To utilize the general method is 
necessary some type of knowledge about topic communication).    

#### Publish General Message

*Parameters:*

- *eventName: string* - Event name referente the message that will be published in bus. 
It's recomendable utilize camel case in the follow format: {RESOURCE}{ACTION}Event
- *exchange: string* - Name of exchange that will be created or utilized during forwarded of message to rabbitMQ bus
- *routingKey: string* - Define the rule that the exchange should follow during the message routing
- *body: any* - Message that will be forwarded to rabbitMQ bus

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if message was publish in rabbitMQ bus, 
otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

```TypeScript
    pub(eventName: string, exchange: string, routingKey: string,
        body: any): Promise<boolean | OcariotPubSubException>
```
#### Publish Account Message

*Parameter:*

- *\<resourceName>: any* -

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if message was publish in rabbitMQ bus, 
 otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

```TypeScript
    pubUpdateChild(child: any): Promise<boolean | OcariotPubSubException>

    pubUpdateFamily(family: any): Promise<boolean | OcariotPubSubException>

    pubUpdateEducator(educator: any): Promise<boolean | OcariotPubSubException>

    pubUpdateHealthProfessional(healthprofessional: any): Promise<boolean | OcariotPubSubException>

    pubUpdateApplication(application: any): Promise<boolean | OcariotPubSubException>

    pubDeleteUser(user: any): Promise<boolean | OcariotPubSubException>

    pubDeleteInstitution(institution: any): Promise<boolean | OcariotPubSubException>
```

#### Publish Activity Message

*Parameter:*

- *\<resourceName>: any* -

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if message was publish in rabbitMQ bus, 
 otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

```TypeScript
    pubSavePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>

    pubUpdatePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>

    pubDeletePhysicalActivity(activity: any): Promise<boolean | OcariotPubSubException>

    pubSaveSleep(sleep: any): Promise<boolean | OcariotPubSubException>

    pubUpdateSleep(sleep: any): Promise<boolean | OcariotPubSubException>

    pubDeleteSleep(sleep: any): Promise<boolean | OcariotPubSubException>

    pubSaveEnvironment(environment: any): Promise<boolean | OcariotPubSubException>

    pubDeleteEnvironment(environment: any): Promise<boolean | OcariotPubSubException>
```

### Subscribe Message

#### Subscribe General Message

*Parameters:*

- *exchange: string* - Name of exchange that will be created or utilized during forwarded of message to rabbitMQ bus
- *queue: string* - Queue name that will be receive the messages forwarded through the exchange specified
- *routingKey: string* - Define the rule that the exchange should follow during the message routing
- *callback: (message: any) => void* - Funciotn that will be executed when some message arrive in queue

*Return:*

- *Promise<boolean | OcariotPubSubException>* - It will return true if realized subscription in rabbitMQ bus 
with sucess, otherwise will be return false. In error case, will return a exception of type OcariotPubSubException

 ```TypeScript
   sub(exchange: string, queue: string, routingKey: string,
        callback: (message: any) => void): Promise<boolean | OcariotPubSubException>
```

#### Subscribe Account Message

*Parameter:*

- *callback: (message: any) => void* -

*Return:*

- *Promise<boolean | OcariotPubSubException>* -  It will return true if realized subscription in rabbitMQ bus 
with sucess, otherwise will be return false. In error case, will return a exception of type OcariotPubSubException


```TypeScript
    subUpdateChild(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subUpdateFamily(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subUpdateEducator(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subUpdateHealthProfessional(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subUpdateApplication(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subDeleteUser(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subDeleteInstitution(callback: (message: string) => void): Promise<boolean | OcariotPubSubException>
```

#### Subscribe Activity Message

*Parameter:*

- *callback: (message: any) => void* -

*Return:*

- *Promise<boolean | OcariotPubSubException>* -  It will return true if realized subscription in rabbitMQ bus 
 with sucess, otherwise will be return false. In error case, will return a exception of type OcariotPubSubException


```TypeScript
    subSavePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subUpdatePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subDeletePhysicalActivity(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subSaveSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subUpdateSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subDeleteSleep(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subSaveEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>

    subDeleteEnvironment(callback: (message: any) => void): Promise<boolean | OcariotPubSubException>
```
---

#### Receive Yourself Message
This method is utilized to enable/disable the monitoring the published events themselves in Rabbit Bus. When actived,
it's possible receive the messagens, since you have subscribed in the same event. This function can be enable/disable
through the following parameter:

*Parameter:*
- *value: boolean* - Used to enable or disable logging.

*Return:*
- *boolean* - This method will return *true* if the operation was actived, otherwise it will return *false*


```TypeScript
    receiveFromYourself(value: boolean): boolean
```

---

###  Logs Emission Manager

This method is utilize to visualize logs emitted during the processing of library.
It can be enable/disable through the following parameters: 

*Parameter:*
- *enabled: boolean* - Used to enable or disable logging.
- *level: string* - This parameter is optional. If passed, has to be one 
of the options:  **'warn'**, **'error'** or **'info'**. The default level is **'info'**

*Return:*
- *boolean* - This method will return *true* if the operation was actived, otherwise it will return *false*

```TypeScript
    logger(enabled: boolean, level?: string): boolean
```

---

###  Events
    #on('connected_pub', function() {...})
   
    #on('connected_sub', function() {...})
   
    #on('connected_client', function() {...})
   
    #on('connected_server', function() {...})
These events are emitted when a connection is concretized, making possible utilize the methods 
referents client/server and publish/subscribe in Rabbit Bus.

    #on('disconnected_pub', function() {...})

    #on('disconnected_sub', function() {...})

    #on('disconnected_client', function() {...})

    #on('disconnected_server', function() {...})
These events are emitted when a connection is closed, after calling the [close method](#events). 

    #on('lost_connection_pub', function() {...})

    #on('lost_connection_sub', function() {...})

    #on('lost_connection_client', function() {...})

    #on('lost_connection_server', function() {...})
These events are emitted when the respective connection is lost and before attempting to re-establish the connection.
  
    #on('trying_connection_pub', function() {...})
   
    #on('trying_connection_sub', function() {...})
   
    #on('trying_connection_client', function() {...})
   
    #on('trying_connection_server', function() {...})
These events are emitted during the time that try re-establish the connection.

    #on('reconnected_pub', function() {...})

    #on('reconnected_sub', function() {...})

    #on('reconnected_client', function() {...})

    #on('reconnected_server', function() {...})
These events are emitted when the respective connection is re-established.

    #on('error_pub', function(err) {...})

    #on('error_sub', function(err) {...})

    #on('error_client', function(err) {...})

    #on('error_server', function(err) {...})
These events are emitted when a error is registered during the connection.
