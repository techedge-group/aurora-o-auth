/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamUpdateAccountsHandler } from './iam-update-accounts.handler';
import { IamUpdateAccountsInput } from '../../../../graphql';

// sources
import { accounts } from '@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountsHandler', () =>
{
    let handler: IamUpdateAccountsHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateAccountsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler     = module.get<IamUpdateAccountsHandler>(IamUpdateAccountsHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamUpdateAccountsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateAccountsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a accounts updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await handler.main(<IamUpdateAccountsInput>accounts[0])).toBe(accounts[0]);
        });
    });
});