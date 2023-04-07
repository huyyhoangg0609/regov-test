import { Body, Controller, HttpException, HttpStatus, Post, Query } from '@nestjs/common';

import { IssuerService } from './issuer.service';
import { SessionService } from '../session/session.service';
import { CreateCredential } from './dto/createCredential.dto';
import { CreateSchemaDto } from './dto/createSchema.dto';


@Controller('issuer')
export class IssuerController {
    constructor(
        private readonly issuerService: IssuerService,
        private readonly sessionService: SessionService
    ) {}

    @Post('/schema/create')
    public async createSchema(@Body() schema: CreateSchemaDto) {
        return await this.issuerService.createCredCredentialSchemaAndDef(this.sessionService.session, schema);
    }

    @Post('/credential/create')
    public async createCredential(@Body() input: CreateCredential, @Query('cred-def-id') credDefId?: string) {
        return await this.issuerService.offerCredential(this.sessionService.session, input, credDefId);
    }


}
