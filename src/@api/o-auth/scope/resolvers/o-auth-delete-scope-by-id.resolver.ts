import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { OAuthDeleteScopeByIdHandler } from '../handlers/o-auth-delete-scope-by-id.handler';
import { OAuthScope } from '../../../../graphql';

@Resolver()
export class OAuthDeleteScopeByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteScopeByIdHandler,
    ) {}

    @Mutation('oAuthDeleteScopeById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}