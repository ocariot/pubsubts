#   ocariot-pubsubjs
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
```TypeScript
OcariotPubSub (host: string, port: number, username: string, password: string,
                                 options?: IOptions)
```

### Close

### Publish Message

#### Publish General Message

#### Publish Activity Message

#### Publish Account Message

### Subscribe Message

#### Subscribe General Message

#### Subscribe Activity Message

#### Subscribe Account Message

#### Receive Yourself Message

###  Logs Emission Manager
