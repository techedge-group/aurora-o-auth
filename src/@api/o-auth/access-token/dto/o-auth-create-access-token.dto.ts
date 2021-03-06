/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthCreateRefreshTokenDto } from '../../../o-auth/refresh-token/dto/o-auth-create-refresh-token.dto';

export class OAuthCreateAccessTokenDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : '54cf18cd-3d11-49c5-a69b-6fad2ba94246',
    })
    clientId: string;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId?: string;

    @ApiProperty({
        type       : String,
        description: 'token [input here api field description]',
    })
    token: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isRevoked [input here api field description]',
    })
    isRevoked: boolean;

    @ApiProperty({
        type       : String,
        description: 'expiresAt [input here api field description]',
    })
    expiresAt?: string;

    @ApiProperty({
        type       : OAuthCreateRefreshTokenDto,
        description: 'refreshToken [input here api field description]',
    })
    refreshToken?: OAuthCreateRefreshTokenDto;

}