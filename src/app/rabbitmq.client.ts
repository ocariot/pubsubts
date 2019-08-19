import {
    IMessageApplication,
    IMessageBodyFat,
    IMessageChild,
    IMessageEducator,
    IMessageEnvironment,
    IMessageFamily,
    IMessageHealthProfessional,
    IMessageInstitution,
    IMessagePhysicalActivity,
    IMessageSleep,
    IMessageUser,
    IMessageWeigth
} from '../port/pub/message.interface'
import {
    amqpClient,
    IClientOptions,
    IConnection,
    IConnectionParams,
    IPubExchangeOptions,
    IServerOptions,
    IServerRegister,
    ISubExchangeOptions
} from 'amqp-client-node'
import { RoutingKeysName } from '../utils/routing.keys.name'
import { ExchangeName } from '../utils/exchange.name'
import { EventName } from '../utils/event.name'
import { Configurations } from '../utils/configurations'
import { EventEmitter } from 'events'
import { IConnectionConfigs } from '../port/connection/config.interface'
import { IOcariotPubSub } from '../port/ocariot.pub.sub.interface'
import { TargetMicroservice } from '../utils/queue.name'
import { ResourceName } from '../utils/resource.name'
import { IConnectionOptions } from '../port/connection/opt.interface'

const defaultOptionPub: IPubExchangeOptions = {
    exchange: {
        durable: true,
        type: 'direct'
    }
}
const defaultOptionSub: ISubExchangeOptions = {
    consumer: { noAck: true },
    exchange: {
        durable: true,
        type: 'direct'
    },
    queue: {
        durable: true
    },
    receiveFromYourself: false
}
const defaultOptionRpcClient: IClientOptions = {
    exchange: {
        durable: true,
        type: 'direct'
    },
    rcpTimeout: 5000
}
const defaultOptionRpcServer: IServerOptions = {
    consumer: { noAck: false },
    exchange: {
        durable: true,
        type: 'direct'
    },
    queue: {
        durable: true
    }
}
const defaultConnConfig: IConnectionParams = {
    protocol: 'amqp',
    hostname: '127.0.0.1',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: 'ocariot'
}
const defaultConnOpt: IConnectionOptions = {
    retries: 0,
    interval: 1000
}

export class RabbitMQClient extends EventEmitter implements IOcariotPubSub {

    private readonly _connConfig: IConnectionParams | string
    private readonly _connOpt: IConnectionOptions

    private _pubConnection: IConnection
    private _pubConnectionInitialized: Promise<IConnection>
    private _subConnection: IConnection
    private _subConnectionInitialized: Promise<IConnection>
    private _serverConnection: IConnection
    private _serverConnectionInitialized: Promise<IConnection>
    private _clientConnection: IConnection
    private _clientConnectionInitialized: Promise<IConnection>

    constructor(private _appName: string, connParams?: IConnectionConfigs | string, connOptions?: IConnectionOptions) {
        super()

        this._connConfig = { ...defaultConnConfig } as IConnectionParams

        if (typeof connParams === 'object') {
            this._connConfig = { ...this._connConfig, ...connParams } as IConnectionParams
        }

        if (typeof connParams === 'string') {
            this._connConfig = connParams.concat('/').concat(Configurations.VHOST)
        }

        this._connOpt = { ...defaultConnOpt, ...connOptions } as IConnectionOptions

        if (connOptions) {
            if (connOptions.receiveFromYourself !== undefined)
                defaultOptionSub.receiveFromYourself = connOptions.receiveFromYourself
            if (connOptions.rpcTimeout)
                defaultOptionRpcClient.rcpTimeout = connOptions.rpcTimeout
        }

    }

    private pubEventInitialization(): void {

        this._pubConnection.on('close_connection', () => {
            this.emit('pub_disconnected')
        })
        this._pubConnection.on('re_established_connection', () => {
            this.emit('pub_reconnected')
        })
        this._pubConnection.on('trying_connect', () => {
            this.emit('pub_trying_connection')
        })
        this._pubConnection.on('lost_connection', () => {
            this.emit('pub_lost_connection')
        })
        this._pubConnection.on('error_connection', (err) => {
            this.emit('pub_connection_error', err)
        })

    }

    private subEventInitialization(): void {

        this._subConnection.on('close_connection', () => {
            this.emit('sub_disconnected')
        })
        this._subConnection.on('re_established_connection', () => {
            this.emit('sub_reconnected')
        })
        this._subConnection.on('trying_connect', () => {
            this.emit('sub_trying_connection')
        })
        this._subConnection.on('lost_connection', () => {
            this.emit('sub_lost_connection')
        })
        this._subConnection.on('error_connection', (err) => {
            this.emit('sub_connection_error', err)
        })

    }

    private serverEventInitialization(): void {

        this._serverConnection.on('close_connection', () => {
            this.emit('rpc_server_disconnected')
        })
        this._serverConnection.on('re_established_connection', () => {
            this.emit('rpc_server_reconnected')
        })
        this._serverConnection.on('trying_connect', () => {
            this.emit('rpc_server_trying_connection')
        })
        this._serverConnection.on('lost_connection', () => {
            this.emit('rpc_server_lost_connection')
        })
        this._serverConnection.on('error_connection', (err) => {
            this.emit('rpc_server_connection_error', err)
        })
    }

    private clientEventInitialization(): void {

        this._clientConnection.on('close_connection', () => {
            this.emit('rpc_client_disconnected')
        })
        this._clientConnection.on('re_established_connection', () => {
            this.emit('rpc_client_reconnected')
        })
        this._clientConnection.on('trying_connect', () => {
            this.emit('rpc_client_trying_connection')
        })
        this._clientConnection.on('lost_connection', () => {
            this.emit('rpc_client_lost_connection')
        })
        this._clientConnection.on('error_connection', (err) => {
            this.emit('rpc_client_connection_error', err)
        })

    }

    public logger(level: string): void {

        if (level === 'warn' || level === 'error' || level === 'info' || !level) {
            amqpClient.logger(level)
        }

    }

    public async close(): Promise<void> {
        try {
            await this._pubConnection.close()
            await this._subConnection.close()
            await this._clientConnection.close()
            await this._serverConnection.close()
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public async dispose(): Promise<void> {
        try {
            await this._pubConnection.dispose()
            await this._subConnection.dispose()
            await this._clientConnection.dispose()
            await this._serverConnection.dispose()
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }

    private pubConnection(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (!this._pubConnection && !this._pubConnectionInitialized) {
                this._pubConnectionInitialized = amqpClient.createConnetion(this._connConfig, this._connOpt)

                try {
                    this._pubConnection = await this._pubConnectionInitialized
                    this.pubEventInitialization()
                    this.emit('pub_connected')
                } catch (err) {
                    this._pubConnection = undefined
                    this._pubConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._pubConnectionInitialized
                resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    private async publish(exchangeName: string, routingKey: string, body: any): Promise<void> {

        return new Promise<void>(async (resolve, reject) => {

            try {
                await this.pubConnection()
            } catch (err) {
                return reject(err)
            }

            const message = { content: body }

            return this._pubConnection.pub(exchangeName, routingKey, message, defaultOptionPub)
        })
    }

    public async pub(routingKey: string, body: any): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            try {
                await this.pubConnection()
            } catch (err) {
                return reject(err)
            }

            const message = { content: body }

            return this._pubConnection.pub(ExchangeName.PUB_SUB_GENERAL, routingKey, message, defaultOptionPub)
        })
    }

    private subConnection(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (!this._subConnection && !this._subConnectionInitialized) {
                this._subConnectionInitialized = amqpClient.createConnetion(this._connConfig, this._connOpt)

                try {
                    this._subConnection = await this._subConnectionInitialized
                    this.subEventInitialization()
                    this.emit('sub_connected')
                } catch (err) {
                    this._subConnection = undefined
                    this._subConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._subConnectionInitialized
                resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    public sub(targetMicroservice: string, routingKey: string,
               callback: (message: any) => void): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            try {
                await this.subConnection()
            } catch (err) {
                return reject(err)
            }

            return this._subConnection.sub(this._appName.concat(targetMicroservice),
                ExchangeName.PUB_SUB_GENERAL,
                routingKey,
                msg => callback(msg.content),
                defaultOptionSub)
        })
    }

    private subscribe(targetMicroservice: string, exchangeName: string, routingKey: string,
                      callback: (message: any) => void): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            try {
                await this.subConnection()
            } catch (err) {
                return reject(err)
            }

            return this._subConnection.sub(this._appName.concat(targetMicroservice),
                exchangeName,
                routingKey,
                msg => callback(msg.content),
                defaultOptionSub)
        })
    }

    private serverConnection(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (!this._serverConnectionInitialized) {
                this._serverConnectionInitialized = amqpClient.createConnetion(this._connConfig, this._connOpt)
                try {
                    this._serverConnection = await this._serverConnectionInitialized
                    this.serverEventInitialization()
                    this.emit('rpc_server_connected')
                } catch (err) {
                    this._serverConnection = undefined
                    this._serverConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._serverConnectionInitialized
                return resolve()
            } catch (err) {
                return reject(err)
            }
        })
    }

    private resource(sourceMicroservice: string, exchangeName: string, name: string, func: (...any) => any[]): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            try {
                await this.serverConnection()
            } catch (err) {
                return reject(err)
            }

            const server: IServerRegister = this._serverConnection
                .createRpcServer(sourceMicroservice, exchangeName, [], defaultOptionRpcServer)

            if (server.addResource(name, func)) return await server.start()
        })
    }

    public provide(name: string, func: (...any) => any): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {

            try {
                await this.serverConnection()
            } catch (err) {
                return reject(err)
            }

            const server: IServerRegister = this._serverConnection
                .createRpcServer(TargetMicroservice.RCP_OCARIOT_GENERAL_SERVICE,
                    ExchangeName.RPC_GENERAL, [], defaultOptionRpcServer)

            if (server.addResource(name, func)) return await server.start()
        })
    }

    public getResource(name: string, params: any[], callback: (err, result) => any): void

    public getResource(name: string, params: any[]): Promise<any>

    public getResource(name: string, params: any[], callback?: (err, result) => any): void | Promise<any> {

        if (!callback) {
            return this.getResourcePromise(ExchangeName.RPC_GENERAL, name, params)
        }
        this.getResourceCallback(ExchangeName.RPC_GENERAL, name, params, callback)
    }

    private requestResource(exchangeName: string, name: string, params: any[], callback: (err, result) => any): void

    private requestResource(exchangeName: string, name: string, params: any[]): Promise<any>

    private requestResource(exchangeName: string, name: string, params: any[],
                            callback?: (err, result) => any): void | Promise<any> {

        if (!callback) {
            return this.getResourcePromise(exchangeName, name, params)
        }
        this.getResourceCallback(exchangeName, name, params, callback)
    }

    public getResourceCallback(exchangeName: string, name: string, params: any[], callback: (...any) => any): void {
        new Promise<void>(async (resolve, reject) => {
            if (!this._clientConnectionInitialized) {
                this._clientConnectionInitialized = amqpClient.createConnetion(this._connConfig, this._connOpt)

                try {
                    this._clientConnection = await this._clientConnectionInitialized
                    this.clientEventInitialization()
                    this.emit('rpc_client_connected')
                } catch (err) {
                    this._clientConnectionInitialized = undefined
                    return reject(err)
                }
            }

            try {
                await this._clientConnectionInitialized
            } catch (err) {
                return reject(err)
            }

            this._clientConnection.rpcClient(exchangeName, name, params, callback, defaultOptionRpcClient)
        }).catch(err => {
            throw err
        })
    }

    public async getResourcePromise(exchangeName: string, name: string, params: any[]): Promise<any> {

        if (!this._clientConnectionInitialized) {
            this._clientConnectionInitialized = amqpClient.createConnetion(this._connConfig, this._connOpt)

            try {
                this._clientConnection = await this._clientConnectionInitialized
                this.clientEventInitialization()
                this.emit('rpc_client_connected')
            } catch (err) {
                this._clientConnectionInitialized = undefined
                return Promise.reject(err)
            }
        }

        try {
            await this._clientConnectionInitialized
        } catch (err) {
            return Promise.reject(err)
        }
        return this._clientConnection.rpcClient(exchangeName, name, params, defaultOptionRpcClient)
    }

    public pubSavePhysicalActivity(activity: any): Promise<void> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.SAVE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.publish(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, message)
    }

    public pubUpdatePhysicalActivity(activity: any): Promise<void> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.UPDATE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.publish(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, message)
    }

    public pubDeletePhysicalActivity(activity: any): Promise<void> {
        const message: IMessagePhysicalActivity = {
            event_name: EventName.DELETE_PHYSICAL_ACTIVITY_EVENT,
            timestamp: new Date().toISOString(),
            physicalactivity: activity
        }

        return this.publish(ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, message)
    }

    public pubSaveSleep(sleep: any): Promise<void> {
        const message: IMessageSleep = {
            event_name: EventName.SAVE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.publish(ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, message)
    }

    public pubUpdateSleep(sleep: any): Promise<void> {
        const message: IMessageSleep = {
            event_name: EventName.UPDATE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.publish(ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, message)
    }

    public pubDeleteSleep(sleep: any): Promise<void> {
        const message: IMessageSleep = {
            event_name: EventName.DELETE_SLEEP_EVENT,
            timestamp: new Date().toISOString(),
            sleep
        }

        return this.publish(ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP,
            message)
    }

    public pubSaveWeight(weight: any): Promise<void> {
        const message: IMessageWeigth = {
            event_name: EventName.SAVE_WEIGHT_EVENT,
            timestamp: new Date().toISOString(),
            weight
        }

        return this.publish(ExchangeName.WEIGHTS, RoutingKeysName.SAVE_WEIGHTS, message)
    }

    public pubDeleteWeight(weight: any): Promise<void> {
        const message: IMessageWeigth = {
            event_name: EventName.DELETE_WEIGHT_EVENT,
            timestamp: new Date().toISOString(),
            weight
        }

        return this.publish(ExchangeName.WEIGHTS, RoutingKeysName.DELETE_WEIGHTS, message)
    }

    public pubSaveBodyFat(bodyfat: any): Promise<void> {
        const message: IMessageBodyFat = {
            event_name: EventName.SAVE_BODY_FAT_EVENT,
            timestamp: new Date().toISOString(),
            bodyfat
        }

        return this.publish(ExchangeName.BODY_FATS, RoutingKeysName.SAVE_BODY_FATS, message)
    }

    public pubDeleteBodyFat(bodyfat: any): Promise<void> {
        const message: IMessageBodyFat = {
            event_name: EventName.DELETE_BODY_FAT_EVENT,
            timestamp: new Date().toISOString(),
            bodyfat
        }

        return this.publish(ExchangeName.BODY_FATS, RoutingKeysName.DELETE_BODY_FATS, message)
    }

    public pubSaveEnvironment(environment: any): Promise<void> {
        const message: IMessageEnvironment = {
            event_name: EventName.SAVE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        }

        return this.publish(ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, message)
    }

    public pubDeleteEnvironment(environment: any): Promise<void> {
        const message: IMessageEnvironment = {
            event_name: EventName.DELETE_ENVIRONMENT_EVENT,
            timestamp: new Date().toISOString(),
            environment
        }

        return this.publish(ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, message)
    }

    public pubUpdateChild(child: any): Promise<void> {
        const message: IMessageChild = {
            event_name: EventName.UPDATE_CHILD_EVENT,
            timestamp: new Date().toISOString(),
            child
        }

        return this.publish(ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, message)
    }

    public pubUpdateFamily(family: any): Promise<void> {
        const message: IMessageFamily = {
            event_name: EventName.UPDATE_FAMILY_EVENT,
            timestamp: new Date().toISOString(),
            family
        }

        return this.publish(ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, message)
    }

    public pubUpdateEducator(educator: any): Promise<void> {
        const message: IMessageEducator = {
            event_name: EventName.UPDATE_EDUCATOR_EVENT,
            timestamp: new Date().toISOString(),
            educator
        }

        return this.publish(ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, message)
    }

    public pubUpdateHealthProfessional(healthprofessional: any): Promise<void> {
        const message: IMessageHealthProfessional = {
            event_name: EventName.UPDATE_HEALTH_PROFESSIONAL_EVENT,
            timestamp: new Date().toISOString(),
            healthprofessional
        }

        return this.publish(ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, message)
    }

    public pubUpdateApplication(application: any): Promise<void> {
        const message: IMessageApplication = {
            event_name: EventName.UPDATE_APPLICATION_EVENT,
            timestamp: new Date().toISOString(),
            application
        }

        return this.publish(ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS,
            message)
    }

    public pubDeleteUser(user: any): Promise<void> {
        const message: IMessageUser = {
            event_name: EventName.DELETE_USER_EVENT,
            timestamp: new Date().toISOString(),
            user
        }

        return this.publish(ExchangeName.USERS, RoutingKeysName.DELETE_USERS, message)
    }

    public pubDeleteInstitution(institution: any): Promise<void> {
        const message: IMessageInstitution = {
            event_name: EventName.DELETE_INSTITUTION_EVENT,
            timestamp: new Date().toISOString(),
            institution
        }

        return this.publish(ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, message)

    }

    public subSavePhysicalActivity(callback: (message: any) => void): Promise<void> {

        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.SAVE_PHYSICAL_ACTIVITIES, callback)

    }

    public subUpdatePhysicalActivity(callback: (message: any) => void): Promise<void> {

        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.UPDATE_PHYSICAL_ACTIVITIES, callback)

    }

    public subDeletePhysicalActivity(callback: (message: any) => void): Promise<void> {

        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.PHYSICAL_ACTIVITIES, RoutingKeysName.DELETE_PHYSICAL_ACTIVITIES, callback)

    }

    public subSaveSleep(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.SAVE_SLEEP, callback)
    }

    public subUpdateSleep(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.UPDATE_SLEEP, callback)
    }

    public subDeleteSleep(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.SLEEP, RoutingKeysName.DELETE_SLEEP, callback)
    }

    public subSaveWeight(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.WEIGHTS, RoutingKeysName.SAVE_WEIGHTS, callback)
    }

    public subDeleteWeight(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.WEIGHTS, RoutingKeysName.DELETE_WEIGHTS, callback)
    }

    public subSaveBodyFat(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.BODY_FATS, RoutingKeysName.SAVE_BODY_FATS, callback)
    }

    public subDeleteBodyFat(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.BODY_FATS, RoutingKeysName.DELETE_BODY_FATS, callback)
    }

    public subSaveEnvironment(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.ENVIRONMENTS, RoutingKeysName.SAVE_ENVIRONMENTS, callback)
    }

    public subDeleteEnvironment(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.ENVIRONMENTS, RoutingKeysName.DELETE_ENVIRONMENTS, callback)
    }

    public subUpdateChild(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.CHILDREN, RoutingKeysName.UPDATE_CHILDREN, callback)
    }

    public subUpdateFamily(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.FAMILIES, RoutingKeysName.UPDATE_FAMILIES, callback)
    }

    public subUpdateEducator(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.EDUCATORS, RoutingKeysName.UPDATE_EDUCATORS, callback)
    }

    public subUpdateHealthProfessional(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.HEALTH_PROFESSIONALS, RoutingKeysName.UPDATE_HEALTH_PROFESSIONALS, callback)
    }

    public subUpdateApplication(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.APPLICATIONS, RoutingKeysName.UPDATE_APPLICATIONS, callback)
    }

    public subDeleteUser(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.USERS, RoutingKeysName.DELETE_USERS, callback)
    }

    public subDeleteInstitution(callback: (message: any) => void): Promise<void> {
        return this.subscribe(TargetMicroservice.SUB_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.INSTITUTIONS, RoutingKeysName.DELETE_INSTITUTIONS, callback)
    }

    public providePhysicalActivities(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.RPC_ACTIVITY, ResourceName.PHYSICAL_ACTIVITIES, listener)
    }

    public providePhysicalActivitiesLogs(listener: (resource: string, date_start: string,
                                                    date_end: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.RPC_ACTIVITY, ResourceName.PHYSICAL_ACTIVITIES_LOGS, listener)
    }

    public provideSleep(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.RPC_ACTIVITY, ResourceName.SLEEP, listener)
    }

    public provideWights(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.RPC_ACTIVITY, ResourceName.WEIGHTS, listener)
    }

    public provideBodyFats(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.RPC_ACTIVITY, ResourceName.BODY_FATS, listener)
    }

    public provideEnviroments(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACTIVITY_SERVICE,
            ExchangeName.RPC_ACTIVITY, ResourceName.ENVIROMENTS, listener)
    }

    public provideChildren(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.CHILDREN, listener)
    }

    public provideFamilies(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.FAMILIES, listener)
    }

    public provideFamilyChildren(listener: (family_id: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.FAMILY_CHILDREN, listener)
    }

    public provideEducators(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.EDUCATORS, listener)
    }

    public provideEducatorChildrenGroups(listener: (educator_id: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.EDUCATORS_CHILDRES_GROUPS, listener)
    }

    public provideHealthProfessionals(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.HEALTH_PROFESSIONALS, listener)
    }

    public provideHealthProfessionalChildrenGroups(listener: (healthprofessional_id: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, listener)
    }

    public provideApplications(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.APPLICATIONS, listener)
    }

    public provideInstitutions(listener: (query: string) => any): Promise<void> {
        return this.resource(TargetMicroservice.RCP_OCARIOT_ACCOUNT_SERVICE,
            ExchangeName.RPC_ACCOUNT, ResourceName.INSTITUTIONS, listener)
    }

    public getPhysicalActivities(query: string, callback: (err, result) => void): void

    public getPhysicalActivities(query: string): Promise<any>

    public getPhysicalActivities(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.PHYSICAL_ACTIVITIES, [query])
        }
        this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.PHYSICAL_ACTIVITIES, [query], callback)
    }

    public getPhysicalActivitiesLogs(resource: string, dateStart: string,
                                     dateEnd: string, callback: (err, result) => void): void

    public getPhysicalActivitiesLogs(resource: string, dateStart: string,
                                     dateEnd: string): Promise<any>

    public getPhysicalActivitiesLogs(resource: string, dateStart: string,
                                     dateEnd: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.PHYSICAL_ACTIVITIES_LOGS,
                [resource, dateStart, dateEnd])
        }
        this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.PHYSICAL_ACTIVITIES_LOGS,
            [resource, dateStart, dateEnd], callback)
    }

    public getSleep(query: string, callback: (err, result) => void): void

    public getSleep(query: string): Promise<any>

    public getSleep(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.SLEEP, [query])
        }
        this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.SLEEP, [query], callback)
    }

    public getWeights(query: string, callback: (err, result) => void): void

    public getWeights(query: string): Promise<any>

    public getWeights(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.WEIGHTS, [query])
        }
        this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.WEIGHTS, [query], callback)
    }

    public getBodyFats(query: string, callback: (err, result) => void): void

    public getBodyFats(query: string): Promise<any>

    public getBodyFats(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.BODY_FATS, [query])
        }
        this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.BODY_FATS, [query], callback)
    }

    public getEnviroments(query: string, callback: (err, result) => void): void

    public getEnviroments(query: string): Promise<any>

    public getEnviroments(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.ENVIROMENTS, [query])
        }
        this.requestResource(ExchangeName.RPC_ACTIVITY, ResourceName.ENVIROMENTS, [query], callback)
    }

    public getChildren(query: string, callback: (err, result) => void): void

    public getChildren(query: string): Promise<any>

    public getChildren(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.CHILDREN, [query])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.CHILDREN, [query], callback)
    }

    public getFamilies(query: string, callback: (err, result) => void): void

    public getFamilies(query: string): Promise<any>

    public getFamilies(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.FAMILIES, [query])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.FAMILIES, [query], callback)
    }

    public getFamilyChildren(familyId: string, callback: (err, result) => void): void

    public getFamilyChildren(familyId: string): Promise<any>

    public getFamilyChildren(familyId: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.FAMILY_CHILDREN, [familyId])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.FAMILY_CHILDREN, [familyId], callback)
    }

    public getEducators(query: string, callback: (err, result) => void): void

    public getEducators(query: string): Promise<any>

    public getEducators(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.EDUCATORS, [query])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.EDUCATORS, [query], callback)
    }

    public getEducatorChildrenGroups(educatorId: string, callback: (err, result) => void): void

    public getEducatorChildrenGroups(educatorId: string): Promise<any>

    public getEducatorChildrenGroups(educatorId: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.EDUCATORS_CHILDRES_GROUPS, [educatorId])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.EDUCATORS_CHILDRES_GROUPS, [educatorId], callback)
    }

    public getHealthProfessionals(query: string, callback: (err, result) => void): void

    public getHealthProfessionals(query: string): Promise<any>

    public getHealthProfessionals(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.HEALTH_PROFESSIONALS, [query])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.HEALTH_PROFESSIONALS, [query], callback)
    }

    public getHealthProfessionalChildrenGroups(healthProfessionalId: string, callback: (err, result) => void): void

    public getHealthProfessionalChildrenGroups(healthProfessionalId: string): Promise<any>

    public getHealthProfessionalChildrenGroups(healthProfessionalId: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS,
                [healthProfessionalId])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT,
            ResourceName.HEALTH_PROFESSIONAL_CHILDREN_GROUPS, [healthProfessionalId], callback)
    }

    public getApplications(query: string, callback: (err, result) => void): void

    public getApplications(query: string): Promise<any>

    public getApplications(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.APPLICATIONS, [query])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.APPLICATIONS, [query], callback)
    }

    public getInstitutions(query: string, callback: (err, result) => void): void

    public getInstitutions(query: string): Promise<any>

    public getInstitutions(query: string, callback?: (err, result) => void): any {

        if (!callback) {
            return this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.INSTITUTIONS, [query])
        }
        this.requestResource(ExchangeName.RPC_ACCOUNT, ResourceName.INSTITUTIONS, [query], callback)
    }

}
