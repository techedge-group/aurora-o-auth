/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthAccessTokenDto } from '../../../o-auth/access-token/dto/o-auth-access-token.dto';

export class OAuthRefreshTokenDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'accessTokenId [input here api field description]',
        example    : '25ad0664-9799-41d2-bda5-6d854b12ce99',
    })
    accessTokenId: string;

    @ApiProperty({
        type       : () => OAuthAccessTokenDto,
        description: 'accessTokenId [input here api field description]',
    })
    accessToken?: OAuthAccessTokenDto;

    @ApiProperty({
        type       : String,
        description: 'token [input here api field description]',
    })
    token: string;

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
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}