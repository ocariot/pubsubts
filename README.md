# OCARIoT - RabbitMQ Client Node

[![License][license-image]][license-url] [![NPM Version][npm-image]][npm-url] [![NPM Downloads][downloads-image]][npm-url] [![Travis][travis-image]][travis-url] [![Coverage][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url] [![DependenciesDev][dependencies-dev-image]][dependencies-dev-url] [![Vulnerabilities][known-vulnerabilities-image]][known-vulnerabilities-url]  [![Releases][releases-image]][releases-url]  [![Contributors][contributors-image]][contributors-url] [![Issues][issues-image]][issues-url]

--------

High abstraction client, subscribed to TypeScript for message handling in the OCARIoT platform RabbitMQ event bus.


### Installation
```bash
npm install @ocariot/rabbitmq-client-node
```

### Connection

You do not have to worry about handling RabbitMQ connections, the library itself will perform all necessary procedures to establish and reestablish the connection as needed. You only need to provide the necessary configurations in the OcariotRabbitMQClient class constructor and use the methods to publish, subscribe, provide resources, and execute queries.

```TypeScript
import {
    IOcariotRabbitMQClient,
    OcariotRabbitMQClient,
    IConnectionOption
} from '@ocariot/rabbitmq-client-node'

const options: IConnectionOption = {
    retries: 0, // endless attempts
    interval: 1000,
    rpcTimeout: 5000,
    receiveFromYourself: false,
    sslOptions: {}
}

const ocariotRabbitMQ: IOcariotRabbitMQClient = new OcariotRabbitMQClient(
    'activity.tracking.app', //  App name
    'amqp://guest:guest@localhost:5672', // connection uri
    options // Options used in connection. Is optional
)
```
So far, there is no connection to the RabbitMQ instance, the connection is created only when any publish, subscribe, resource provisioning, or resource lookup operation is performed. Therefore, depending on usage, 1 to 4 connections will be created at most, one for publication, one for subscription, one for resource provisioning, and one for resource query. For more information [see here >>](https://github.com/ocariot/rabbitmq-client-node/wiki/1.-Connection).

**NOTE:** Be careful when instantiating the library, make sure the instance is unique throughout the application. You can **use the singleton pattern** *(software design pattern)* to avoid unwanted situations such as too many connections.

### Publish

To publish events to the message bus, use one of the functions that begins with `pub`, for example, to publish the saved physical activity event, use the `pubSavePhysicalActivity(activity)` function.

```typescript
ocariotRabbitMQ
    .pubSavePhysicalActivity({
        id: '5d63d221fa71a1001971634a',
        start_time: '2019-06-06T15:27:46.000Z',
        end_time: '2019-06-06T15:42:18.000Z',
        duration: 872000,
        child_id: '5d601e0775e1850012fd161a',
        name: 'Outdoor Bike',
        calories: 73,
        steps: 0
    })
    .then(() => {
        console.log('Physical Activity published successfully!')
    })
    .catch((err) => {
        console.log(`Error publishing Physical Activity : ${err.message}`)
    })
```

If there is a connection, the event will be published immediately, otherwise the library will attempt to establish the connectionautomatically and the event will be published as soon as the connection is established and shortly after the promise will be flagged as resolved. For more information, like all methods available in the latest version, [see here >>](https://github.com/ocariot/rabbitmq-client-node/wiki/2.-Publish).

### Subscribe

To subscribe to events on the message bus, use one of the functions beginning with `sub`, for example to subscribe to the deleted user event use the `subDeleteUser(callback)` function.

```typescript
ocariotRabbitMQ
    .subDeleteUser(message => {
            console.log('Event received:', message)
            // {
            //     "event_name": "UserDeleteEvent",
            //     "timestamp": "2019-09-08T23:31:11.627Z",
            //     "user": {
            //         "id": "5a62be07de34500146d9c544",
            //         "type": "child",
            //         "username": "BR9999",
            //         ...
            //     }
            // }
        }
    )
    .then(() => console.log('Subscribe successfully registered!'))
    .catch(e => console.log(`Subscribe error: ${e.message}`))
```

As with publishing, if there is a connection, the event registration will start immediately, otherwise the library will attempt to establish the connection and the promise will be resolved when the connection is successfully established, signaling that the event registration has been initialized successfully. For more information, like all methods available in the latest version, [see here >>](https://github.com/ocariot/rabbitmq-client-node/wiki/3.-Subscribe).

### Resource Provide

To provide a resource on the message bus, use one of the functions beginning with `provide`. By providing a resource, it will be available for other services to consult, for example, to provide the Physical Activity resource, just use the `providePhysicalActivities (query)` function.
To make it easier for those who query the resource, the query string concept applied in the REST API is used. This makes it possible to perform queries with filters. When a function has the `query` parameter, it indicates that the resource provider must interpret and use the query string to return the requested data. The [query-strings-parser](https://www.npmjs.com/package/query-strings-parser) library can be used as it transforms a query string into the format interpreted by MongoDB as long as the query string is in the known format.

```typescript
ocariotRabbitMQ
    .providePhysicalActivities((query: string) => {
        // Search your database using the query and return the data.
        // You can use lib https://www.npmjs.com/package/query-strings-parser
        // to handle query string for use in MongoDB queries
        return physicalActivities
    })
    .then(() => {
        console.log('Successfully provided resource.')
    })
    .catch((err) => {
        console.log(`Error providing resource: ${err.message}`)
    })
```
**Remote Procedure Call *(RPC)*** is used for this functionality. As with publishing and subscribing when you provide a resource and have a connection, it will be available for consultation immediately otherwise, the library will attempt to establish the connection automatically, and when the connection is successfully established, the resource is available. For more information, like all methods available in the latest version, [see here >>](https://github.com/ocariot/rabbitmq-client-node/wiki/4.-Resource-Provide).


### Resource Query

To query a resource available on the message bus, use one of the functions beginning with `get`, for example, to query all physical activity of the child with ID *5a62be07d6f33400146c9b61* registered in the period *2019-06-07* to *2019-08-01*, use the `getPhysicalActivities(query)` function passing the following query string `'?start_time=gte:2019-06-07&start_time=lt:2019-08-01&child_id=5a62be07d6f33400146c9b61'`

```typescript
ocariotRabbitMQ
    .getPhysicalActivities(
        '?start_time=gte:2019-06-07&start_time=lt:2019-08-01&child_id=5a62be07d6f33400146c9b61'
    )
    .then(resource => {
        // Array containing physical activities
        console.log('Physical activities:', resource)
    })
    .catch((err) => {
        console.log(`Error querying resource: ${err.message}`)
    })
```
As with resource provisioning, RPC is used. When you request a resource and have a connection, the requested resource provider will receive the notification immediately and must process the request. otherwise, the library will attempt to establish the connection automatically and execute the query process when the connection is established. **It is noteworthy that, unlike publication, subscription, and provider, queries will have the maximum duration to receive a response equivalent to the total milliseconds provided in `rpcTimeout` present in library constructor options, with their default value 5000 (5 seconds).** For more information, like all methods available in the latest version, [see here >>](https://github.com/ocariot/rabbitmq-client-node/wiki/5.-Resource-Query).

----

You can consult the [wiki](https://github.com/ocariot/rabbitmq-client-node/wiki) for full details.

[Changelog](https://github.com/ocariot/rabbitmq-client-node/blob/master/CHANGELOG.md)
 - Version [1.0.3](https://github.com/ocariot/rabbitmq-client-node/blob/master/CHANGELOG.md#v103-2019-09-09)

[//]: # (These are reference links used in the body of this note.)
[license-image]: https://img.shields.io/badge/license-Apache%202-blue.svg
[license-url]: https://github.com/ocariot/rabbitmq-client-node/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/@ocariot/rabbitmq-client-node.svg?color=red&logo=npm
[npm-url]: https://npmjs.org/package/@ocariot/rabbitmq-client-node
[downloads-image]: https://img.shields.io/npm/dt/@ocariot/rabbitmq-client-node.svg?logo=npm
[travis-image]: https://img.shields.io/travis/ocariot/rabbitmq-client-node.svg?logo=travis
[travis-url]: https://travis-ci.org/ocariot/rabbitmq-client-node
[coverage-image]: https://coveralls.io/repos/github/ocariot/rabbitmq-client-node/badge.svg
[coverage-url]: https://coveralls.io/github/ocariot/rabbitmq-client-node?branch=master
[known-vulnerabilities-image]: https://snyk.io/test/github/ocariot/rabbitmq-client-node/badge.svg?targetFile=package.json
[known-vulnerabilities-url]: https://snyk.io/test/github/ocariot/rabbitmq-client-node?targetFile=package.json
[dependencies-image]: https://david-dm.org/ocariot/rabbitmq-client-node.svg
[dependencies-url]: https://david-dm.org/ocariot/rabbitmq-client-node
[dependencies-dev-image]: https://david-dm.org/ocariot/rabbitmq-client-node/dev-status.svg
[dependencies-dev-url]: https://david-dm.org/ocariot/rabbitmq-client-node?type=dev
[releases-image]: https://img.shields.io/github/release-date/ocariot/rabbitmq-client-node.svg
[releases-url]: https://github.com/ocariot/rabbitmq-client-node/releases
[contributors-image]: https://img.shields.io/github/contributors/ocariot/rabbitmq-client-node.svg?color=green
[contributors-url]: https://github.com/ocariot/rabbitmq-client-node/graphs/contributors
[issues-image]: https://img.shields.io/github/issues/ocariot/rabbitmq-client-node.svg
[issues-url]: https://github.com/ocariot/rabbitmq-client-node/issues
