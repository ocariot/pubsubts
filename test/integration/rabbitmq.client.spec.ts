import { expect } from 'chai'
import { OcariotRabbitMQClient } from '../../index'
import { IOcariotRabbitMQClient } from '../../src/port/ocariot.rabbitmq.client.interface'

describe('RABBITMQ CLIENT - OCARIoT', () => {
    let ocariotRabbitMQ: IOcariotRabbitMQClient
    const child = {
        id: '5a62be07de34500146d9c544',
        type: 'child',
        username: 'BR9999',
        gender: 'male',
        age: 11,
        institution_id: '5a62be07de34500146d9c624',
        last_login: '2018-11-19T14:40:00Z',
        last_sync: '2018-11-19T14:40:00Z'
    }

    before(() => {
        ocariotRabbitMQ = new OcariotRabbitMQClient(
            'test.app',
            'amqp://guest:guest@127.0.0.1',
            { receiveFromYourself: true, retries: 1, interval: 500 }
        )
    })

    after(async () => {
        await ocariotRabbitMQ.close()
    })

    describe('CONNECTION', () => {
        it('should return an error when unable to connect', () => {
            return (new OcariotRabbitMQClient(
                'test.app',
                'amqp://test:test@127.0.0.1',
                { receiveFromYourself: true, retries: 1, interval: 500 }
            ))
                .pubSavePhysicalActivity({})
                .then(() => {
                    expect.fail('should not connect!')
                })
                .catch(e => {
                    expect(e).to.be.an('error')
                })
        })

        it('should return void after successful connection', async () => {
            return (new OcariotRabbitMQClient(
                'test.app',
                'amqp://guest:guest@127.0.0.1',
                { receiveFromYourself: true, retries: 1, interval: 500 }
            ))
                .pubSavePhysicalActivity({})
                .catch(() => {
                    expect.fail('should not return connection error!')
                })
        })
    })

    describe('PUBLISH', () => {
        context('Publish successfully', () => {
            it('should receive a resolved promise for successful custom event publication', () => {
                return ocariotRabbitMQ
                    .pub('users.lastlogin', {
                        event_name: 'UserLastLogin',
                        timestamp: new Date(),
                        user: child
                    })
                    .catch(() => {
                        expect.fail('should not return error!')
                    })
            })

            it('should receive a resolved promise for successful WeightSaveEvent publication', () => {
                return ocariotRabbitMQ
                    .pubSaveWeight({
                        timestamp: '2019-06-20T14:40:00Z',
                        value: 70.2,
                        unit: 'kg',
                        body_fat: 20.1
                    })
                    .catch(() => {
                        expect.fail('should not return error!')
                    })
            })
        })
    })

    describe('SUBSCRIBE ', () => {
        context('Subscribe successfully', () => {
            it('should receive custom event message', (done) => {
                ocariotRabbitMQ
                    .sub('users.resetpassword', message => {
                        try {
                            expect(message.user).to.deep.equal(child)
                            expect(message).to.have.property('event_name')
                            expect(message).to.have.property('timestamp')
                        } catch (e) {
                            return done(e)
                        }
                        done()
                    })
                    .then(async () => {
                        // Publishing event to subscribe
                        await ocariotRabbitMQ
                            .pub('users.resetpassword', {
                                event_name: 'UserResetPassword',
                                timestamp: new Date(),
                                user: child
                            })
                    })
                    .catch(() => expect.fail('should not return error!'))
            })

            it('should receive UserDeleteEvent', (done) => {
                ocariotRabbitMQ
                    .subDeleteUser((message => {
                        try {
                            expect(message.user).to.deep.equal(child)
                            expect(message).to.have.property('event_name')
                            expect(message).to.have.property('timestamp')
                        } catch (e) {
                            return done(e)
                        }
                        done()
                    }))
                    .then(async () => {
                        // Publishing event to subscribe
                        await ocariotRabbitMQ.pubDeleteUser(child)
                    })
                    .catch(() => expect.fail('should not return error!'))
            })

            it('should receive WeightSaveEvent.', (done) => {
                const weightSave = {
                    timestamp: '2019-06-20T14:40:00Z',
                    value: 70.2,
                    unit: 'kg',
                    body_fat: 20.1
                }
                ocariotRabbitMQ
                    .subSaveWeight((message => {
                        try {
                            expect(message.weight).to.deep.equal(weightSave)
                            expect(message).to.have.property('event_name')
                            expect(message).to.have.property('timestamp')
                        } catch (e) {
                            return done(e)
                        }
                        done()
                    }))
                    .then(async () => {
                        // Publishing event to subscribe
                        await ocariotRabbitMQ.pubSaveWeight(weightSave)
                    })
                    .catch(() => expect.fail('should not return error!'))
            })
        })
    })

    describe('PROVIDE RESOURCE', () => {
        context('Provide unsuccessfully.', () => {
            it('should return error due to connection problem', () => {
                return (new OcariotRabbitMQClient(
                    'test.app',
                    'amqp://test:test@127.0.0.1',
                    { receiveFromYourself: true, retries: 1, interval: 500 }
                ))
                    .provideChildren(() => {
                        return {}
                    })
                    .then(() => {
                        expect.fail('should not connect!')
                    })
                    .catch(e => {
                        expect(e).to.be.an('error')
                    })
            })
        })

        context('Provide successfully.', () => {
            it('should receive a promise that is resolved when registering Child resource', () => {
                ocariotRabbitMQ
                    .provideChildren(query => {
                        return [child]
                    })
                    .catch(() => {
                        expect.fail('should not return connection error!')
                    })
            })
        })
    })

    describe('GET RESOURCE', () => {
        context('get unsuccessfully for lack of connection', () => {
            const connFailed: IOcariotRabbitMQClient = new OcariotRabbitMQClient(
                'test.app',
                'amqp://test:test@127.0.0.1',
                { receiveFromYourself: true, retries: 0, interval: 500, rpcTimeout: 2000 }
            )

            it('should return error due to connection problem. Version with promise', () => {
                return connFailed
                    .getPhysicalActivities('?child_id=5d601e0775e1850012fd161a')
                    .then(() => {
                        expect.fail('should not connect!')
                    })
                    .catch(e => {
                        expect(e).to.be.an('error')
                    })
            })

            it('should return error due to connection problem. Version with callback', (done) => {
                connFailed.getSleep('', (err, result) => {
                    try {
                        expect(err).to.be.an('error')
                        done()
                    } catch (e) {
                        done(e)
                    }
                })
            })
        })

        context('get unsuccessfully for lack of provider', () => {
            const conn: IOcariotRabbitMQClient = new OcariotRabbitMQClient(
                'test.app',
                'amqp://guest:guest@127.0.0.1',
                { receiveFromYourself: true, retries: 0, interval: 500, rpcTimeout: 2000 }
            )

            after(async () => {
                await conn.close()
            })

            it('should return rpc timeout error. Version with promise', () => {
                return conn
                    .getEducators('?age=9')
                    .then(() => {
                        expect.fail('should not connect!')
                    })
                    .catch(err => {
                        expect(err).to.be.an('error')
                    })
            })

            it('should return rpc timeout error. Version with callback', (done) => {
                conn.getFamilies('', (err, result) => {
                    try {
                        expect(err).to.be.an('error')
                        done()
                    } catch (e) {
                        done(e)
                    }
                })
            })
        })

        context('Provide successfully.', () => {
            const conn: IOcariotRabbitMQClient = new OcariotRabbitMQClient(
                'test.app',
                'amqp://guest:guest@127.0.0.1',
                { receiveFromYourself: true, retries: 0, interval: 500, rpcTimeout: 2000 }
            )

            before(async () => {
                await conn.provideChildren(query => {
                    return [child]
                })
            })

            after(async () => {
                await conn.close()
            })

            it('should receive a promise with the requested Child appeal. Version with promise', () => {
                return ocariotRabbitMQ
                    .getChildren('')
                    .then(children => {
                        expect(children).to.deep.include(child)
                    })
            })

            it('should receive a promise with the requested Child appeal. Version with callback', (done) => {
                return ocariotRabbitMQ
                    .getChildren('', (err, children) => {
                        try {
                            expect(children).to.deep.include(child)
                            done()
                        } catch (e) {
                            done(e)
                        }
                    })
            })
        })
    })
})
