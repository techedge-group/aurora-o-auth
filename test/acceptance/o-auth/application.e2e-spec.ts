/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '../../../src/@apps/o-auth/application/domain/application.repository';
import { MockApplicationSeeder } from '../../../src/@apps/o-auth/application/infrastructure/mock/mock-application.seeder';
import { applications } from '../../../src/@apps/o-auth/application/infrastructure/seeds/application.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { AuthenticationJwtGuard } from 'src/@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../src/@api/iam/shared/guards/authorization.guard';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let applicationRepository: IApplicationRepository;
    let applicationSeeder: MockApplicationSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 15s by default are 5s
    jest.setTimeout(15000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                MockApplicationSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = applications;
        app = module.createNestApplication();
        applicationRepository = module.get<IApplicationRepository>(IApplicationRepository);
        applicationSeeder = module.get<MockApplicationSeeder>(MockApplicationSeeder);

        // seed mock data in memory database
        await applicationRepository.insert(applicationSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationCode property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationSecret property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationIsMaster property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationCode property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationSecret property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationIsMaster property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                secret: '*******************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });

    test('/REST:POST o-auth/application/create - Got 400 Conflict, ApplicationIsMaster has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isMaster: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });

    test('/REST:POST o-auth/application/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/applications/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/applications/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: applicationSeeder.collectionResponse.length,
                    count: applicationSeeder.collectionResponse.length,
                    rows : applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'clientIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/applications/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/applications/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'clientIds']))),
                );
            });
    });

    test('/REST:POST o-auth/application/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '8df3701c-3aff-4a09-b3c8-0bfb2ae5afaa',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/application/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST o-auth/application/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/application/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET o-auth/application/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/find/b7be8e19-618a-4949-bd7a-705bac7adfab')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/application/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/application/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'd32d3895-5c36-45b5-a0e3-6f1f35081c1b',
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/application/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/application/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE o-auth/application/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/delete/ba3d1ef1-aebd-4910-9acd-d34e378367f1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/application/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL oAuthPaginateApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthPaginateApplications).toEqual({
                    total: applicationSeeder.collectionResponse.length,
                    count: applicationSeeder.collectionResponse.length,
                    rows : applicationSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'clientIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetApplications', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(applicationSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateApplication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindApplication - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'a7aad787-6216-42d0-89a2-6adcbdb788b9',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindApplication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '66ee075a-5aa8-4e9b-8dda-e1aaa08b7678',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateApplication - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'ac90426e-98b3-4d1a-848e-a2e1a8a960dd',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthUpdateApplication', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteApplicationById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fc1119ef-8fa8-419e-a8cd-c7e338083141',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthDeleteApplicationById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await applicationRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});