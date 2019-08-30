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
---  
### Synopsis
Exemplo de aplicação utilizando a biblioteca:

Em geral o exemplo a seguir demonstra o estabelecimento de uma conexão, na qual deseja-se publicar e receber os próprios ventos emitidos através do barramento. Para realizar isto é necessário os seguintes passos: 

1. Realiza-se a importação da classe RabbitMQClient, necessária para instânciar o objeto que conterá todos os métodos para comunicação com o barramento;

2. Para realizar o auto-recebimento de mensagens publicas da mesma conexão que deseja-se inscrever é necessário a passagem da propriedade *receiveFromYourself* como *true*, referente a interface *IConnectionOptions*;

3. Instância-se o objeto RabbitMQClient passando o nome do microserviço, um objeto vazio (neste caso serão utilizados as configuração de conexão padrão) e as opções da conexão, respectivamente;

4. Através da instância do objeto RabbitMQClient e do chamamento do método *subSavePhysicalActivity(callback)* é realizado a inscrição no evento SavePhysicalActivity, no qual passa-se o callback que será acionado quando tal evento for publicado no barramento;

5. Por fim, é realizado a publicação do evento SavePhysicalActivity através do chamamento do método *pubSavePhysicalActivity(message)*, o qual terá como parâmetro a mesagem que será trafegada no barramento.

```js
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

---
### Connection

No construtor são passadas informações referentes a configuração da conexão com o barramento. Os parâmetro *conf: IConnectionConfigs* e *options: IOption* são opcional. Entretanto, ambas interfaces contém propriedades necessárias para o estabelecimento de conxões SSL/TLS. 

*Parâmetros:*

- *appName: string* - Nome do microserviço que irá se conectar com o barramento
- *conf?: IConnectionConfigs | string* - Parâmetro referẽnte a passagem das configuraçãoes da conexão. É possível realizar a passagem de tais informções atráves da interface IConnectionConfigs, ou atráves da passagem da URI, no seguinte formato: 
>*<protocol>://<user>:<password>@<ip>:<port>*

>Por exemplo:
>
>amqp://guest:guest@localhost:5672
- *options?: IConnectionOptions* - Opções associadas ao estabelecimento da conexão. As propriedades não informadas da interface assumiram os valores padrões;


```js
    OcariotPubSub (appName: string, conf?: IConnectionConfigs,
                   options?: IConnectionOptions)
```
#### IConnectionConfigs
Configuração para o estabelecimento da conexão com o barramento. As propriedades não informadas da interface assumiram os valores padrões.


*Propriedades:*

- *hostname: string* - IP do servidor, o qual será realizada a conexão TCP com o barramento. No caso conexão SS/TLS, assegure-se de está usando o DNS registrado no certificado, gerado a partir de uma autoridade de certificação; 
- *port: number* - Número da porta, a qual será realizada a conexão TCP com o barramento. As configurações padrões do protocolo utiliza a porta 2340 para conexões sem SSL/TLS e a porta 5671 para conexões com SSL/TLS;
- *username: string* - Nome do usuário já resgistrado no barramento; 
- *password: string* - Senha do respectivo usuário informado na propriedade anterior;

```js
    IConnectionConfigs {
        host?: string,
        port?: number,
        username?: string,
        password?: string,
    }
```

*Valores Padões:*

```js
    IConnectionParams = {
        protocol: 'amqp',
        hostname: '127.0.0.1',
        port: 5672,
        username: 'guest',
        password: 'guest',
    }
```
#### IConnectionOptions

Atráves desta interface são definidos configurações capazes de habilitar ou desabilitar conexões SSL/TLS. Além disto, é possível estabelecer a quantidade máxima de tentativas que serão realizadas para estabelecer a conexão com o barramento, bem como o intervalo entre cada uma das tentativas. Por fim, poderão ser definidas configurações referêntes ao tempo máximo que uma requisição aguardará a resposta do proverdor de algum recurso. E ainda, poderá ser habilitado ou desabilitado a configuração capaz de possibilitar o monitoramento das próprias publicações no barramento. 

*Parâmetro:*

- *retries: number* - Defini quantas vezses a biblioteca irá tentar conectar ou reconectar quando uma conexão ainda não estabelecida ou é perdida, respectivamente. Se 0, a tentativas de reconexão será infinita;
- *interval: number* - Defini o intervalo entre as tentativas de conexão em milisegundo;
- *sslOptions: ISSLOptions* - Interface responsável por definir as configurações para o establecimento de conexões SSL/TLS;
- *rcpTimeout: number* - Defini o tempo máximo que uma requisição aguardará por uma resposta;
- *receiveFromYourself: boolean* - Esta proriedade é utilizada para habilitar ou desabilitar o monitaramento de eventos publicados e inscritos através de uma mesma conexão no barramento. Quanto true, é possível receber mensagens, desde que se tenha realizado a inscrição no mesmo evento de publicação;

```js
    IConnectionOptions {
        retries?: number 
        interval?: number 
        sslOptions?: ISSLOptions
        rpcTimeout?: number
        receiveFromYourself?: boolean
    }
```
*Valores das Padrões das Propriedades:*

```js
    IConnectionOptions = {
        retries: 0,
        interval: 1000,
        sslOptions: undefined,
        rcpTimeout: 5000,
        receiveFromYourself: false
    }
```

#### ISSLOptions
>Comentar brevemente a interface e propriedades

*Propriedades:*

- *cert: Buffer* - Referente ao certificado cliente;
- *key: Buffer* - Referente a chave secreta do cliente;
- *passphrase: string* - Frase secreta de proteção a chave secreta do cliente;
- *ca: Buffer[ ]* - Array contendo todas os certificados gerados de entidades de cerficicações reconhecidas;

```js
    ISSLOptions {
        cert?: Buffer,
        key?: Buffer,
        passphrase?: string
        ca?: Buffer[]
    }
```

---

### Close

Este método é utilizado para fechar todas as conexões abertadas de uma única vez.

*Retorno:*
- *Promise\<void>* - A Promise não retornará nada, caso o subscribe no evento tenha sido realizada com sucesso. Em caso de erro, um exceção será retornada.


```js
    close(): Promise<void>
```
---

### Publish Message
Esta seção demonstra como publicar mensagens no barramento. Para o projeto do OCARIoT foram definidos alguns métodos de publicação referêntes a dois microserviços específicos. Atualmente os dois microserviços suportados pela biblioteca são o de Atividade e Conta. Além detes métodos foi criado um método geral, tornando possível a inserção de outros tipos de mensagens que poderão ser publicadas no barramento por microserviços futuros.


#### Publish Account Message

*Parâmetro:*

- *\<resourceName>: any* - Messagem que será encaminhada atráves do barramento;

*Retorno:*

- *Promise<void>* - A Promise não retornará nada, caso o subscribe no evento tenha sido realizada com sucesso. Em caso de erro, um exceção será retornada.

```js
    pubUpdateChild(child: any): Promise<void>

    pubUpdateFamily(family: any): Promise<void>

    pubUpdateEducator(educator: any): Promise<void>

    pubUpdateHealthProfessional(healthprofessional: any): Promise<void>

    pubUpdateApplication(application: any): Promise<void>

    pubDeleteUser(user: any): Promise<void>

    pubDeleteInstitution(institution: any): Promise<void>
```

#### Publish Activity Message

*Parâmetro:*

- *\<resourceName>: any* - Messagem que será encaminhada atráves do barramento;

*Retorno:*

- *Promise<void>* - A Promise não retornará nada, caso o subscribe no evento tenha sido realizada com sucesso. Em caso de erro, um exceção será retornada.

```js
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

#### Publish General Message

*Parâmetros:*

- *routingKey: string* - Defini a regra que será utilizada pelo exchange para realizar o rotemento de messagens;
- *body: any* - Messagem que será encaminhada atráves do barramento;

*Retorno:*

- *Promise<void>* - A Promise não retornará nada, caso o subscribe no evento tenha sido realizada com sucesso. Em caso de erro, um exceção será retornada.

```js
    pub(routingKey: string, body: any): Promise<void>
```

### Subscribe Message
De forma análoga a seção do Publish Message, nesta seção será demonstrado como inscrever-se nos eventos de mensagens publicados no barramento. Como visto anteriormente, para o projeto do OCARIoT foram definidos alguns métodos, desta vez, métodos para inscrição de eventos referêntes aos dois microserviços específicos. Atualmente os dois microserviços suportados pela biblioteca são o de Atividade e Conta. Além destes métodos foi criado um método geral, tornando possível a inscrição em outros eventos de mensagens que poderão ser monitorados no barramento por microserviços futuros.


#### Subscribe Account Message

*Parâmetro:*

- *callback: (message: any) => void* - Função que será executada quando uma mensagem for direcionado pelo exchange para o atual subsribe;

*Retorno:*

- *Promise<void>* - A Promise não retornará nada, caso o subscribe no evento tenha sido realizada com sucesso. Em caso de erro, um exceção será retornada.


```js
    subUpdateChild(callback: (message: any) => void): Promise<void>

    subUpdateFamily(callback: (message: any) => void): Promise<void>

    subUpdateEducator(callback: (message: any) => void): Promise<void>

    subUpdateHealthProfessional(callback: (message: any) => void): Promise<void>

    subUpdateApplication(callback: (message: any) => void): Promise<void>

    subDeleteUser(callback: (message: any) => void): Promise<void>

    subDeleteInstitution(callback: (message: string) => void): Promise<void>
```

#### Subscribe Activity Message

*Parâmetro:*

- *callback: (message: any) => void* - Função que será executada quando uma mensagem for direcionado pelo exchange para o atual subsribe;

*Retorno:*

- *Promise<void>* -  A Promise não retornará nada, caso o subscribe no evento tenha sido realizada com sucesso. Em caso de erro, um exceção será retornada.


```js
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

#### Subscribe General Message

*Parâmetros:*

- *targetMicroservice: string* - Nome do microserviço do qual os eventos estarão sendo monitados;
- *routingKey: string* - Defini a regra que será utilizada pelo exchange para realizar o rotemento de messagens;
- *callback: (message: any) => void* - Função que será executada quando uma mensagem for direcionado pelo exchange para o atual subsribe;

*Retorno:*

- *Promise<void>* - A Promise não retornará nada, caso o subscribe no evento tenha sido realizada com sucesso. Em caso de erro, um exceção será retornada.

 ```js
   sub(targetMicroservice: string, routingKey: string,
       callback: (message: any) => void): Promise<void>
```


---

### Resource Provider

#### Account Microservice Resource Provider

*Parâmetros:*

*Retorno:*

```js
    providePhysicalActivities(listener: (query: string) => any): any

    providePhysicalActivitiesLogs(listener: (resource: string, date_start: string, date_end: string) => any): any

    provideSleep(listener: (query: string) => any): any

    provideWights(listener: (query: string) => any): any

    provideBodyFats(listener: (query: string) => any): any

    provideEnviroments(listener: (query: string) => any): any
```

#### Activity Microservice Resource Provider

*Parâmetros:*

*Retorno:*

```js
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

#### General Resource Provider

*Parâmetros:*

*Retorno:*

```js
    provide(name: string, func: (...any) => any): void
```

---
### Resource Requester

#### Account Microservice Resource Requester

##### Callback Version 

*Parâmetros:*

*Retorno:*

```js
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

##### Promise Version 

*Parâmetros:*

*Retorno:*

```js

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

##### Callback Version 

*Parâmetros:*

*Retorno:*

```js
    getPhysicalActivities(query: string, callback: (err, result) => any): void

    getPhysicalActivitiesLogs(resource: string, date_start: number, date_end: number, callback: (err, result) => any): void

    getSleep(query: string, callback: (err, result) => any): void

    getWeights(query: string, callback: (err, result) => any): void

    getBodyFats(query: string, callback: (err, result) => any): void

    getEnviroments(query: string, callback: (err, result) => any): void 
```

##### Promise Version 

*Parâmetros:*

*Retorno:*

```js
    getPhysicalActivities(query: string): Promise<any>

    getPhysicalActivitiesLogs(resource: string, date_start: number, date_end: number): Promise<any>

    getSleep(query: string): Promise<any>

    getWeights(query: string): Promise<any>

    getBodyFats(query: string): Promise<any>

    getEnviroments(query: string): Promise<any>  
```

#### General Resource Requester 

##### Callback Version  

*Parâmetros:*

*Retorno:*

```js
    getResource(name: string, params: any[], callback: (...any) => any): void
```

##### Promise Version 

*Parâmetros:*

*Retorno:*

```js
    getResource(name: string, params: any[]): Promise<any>
```


---
###  Events
```js
    #on('pub_connected', function() {...})
   
    #on('sub_connected', function() {...})
   
    #on('rpc_client_connected', function() {...})
   
    #on('rpc_server_connected', function() {...})
```
Estes eventos são emitidos quando ocorre o estabelecimento de uma conexão, tornando possível a utilização dos métodos referente ao publish/subscribe e provider/get no barramento do RabbitMQ. 
```js
    #on('pub_disconnected', function() {...})

    #on('sub_disconnected', function() {...})

    #on('rpc_client_disconnected', function() {...})

    #on('rpc_server_disconnected', function() {...})
```
Estes eventos são emitidos quando uma conexão é fechada corretamente, isto é, após o chamamento dos métodos dispose ou close.
```js
    #on('pub_lost_connection', function() {...})

    #on('sub_lost_connection', function() {...})

    #on('rpc_client_lost_connection', function() {...})

    #on('rpc_server_lost_connection', function() {...})
```
Este eventos são emitidos quando uma conexão é perdida, uma vez que a mesma tinha já estabelecido uma conexão anteriormente.

```js  
    #on('pub_trying_connection', function() {...})
   
    #on('sub_trying_connection', function() {...})
   
    #on('rpc_client_trying_connection', function() {...})
   
    #on('rpc_server_trying_connection', function() {...})
```
Estes eventos são emitidos durante as tentativas de se reconectar com uma conexão que foi perdida, ou durante o estabelecimento da conexão, a qual por exemplo, contém credenciais inválidas.

```js
    #on('pub_reconnected', function() {...})

    #on('sub_reconnected', function() {...})

    #on('rpc_client_reconnected', function() {...})

    #on('rpc_server_reconnected', function() {...})
```
Estes eventos serão emitidos quando uma conexão que foi anteriormente estabelecida, entretanto por algum motivo perdeu a conexão, conseguiu restabelecer a conexão.

```js
    #on('pub_connection_error', function(err) {...})

    #on('sub_connection_error', function(err) {...})

    #on('rpc_client_connection_error', function(err) {...})

    #on('rpc_server_connection_error', function(err) {...})
```
Estes eventos serão emitidos quando um erro for registrado durante a conexão. O callback destes eventos são acompanhados com o erro ocorrido em seu primeiro parâmetro.

---

### Logs Emission

Este método é utilizado para visualizar logs emitido durante a utilização da biblioteca. Isto pode ser habilitado ou desabilitado através dos seguintes parâmetros:

*Parâmetro:*
- *level: string* - Este parâmetro deve ser defino com um dos três níveis de logs suportados pela biblioteca, os quais são:  **'warn'**, **'error'** or **'info'**.

```js
    logger(level: string): void
```
