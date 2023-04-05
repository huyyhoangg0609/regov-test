import { Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { HolderService } from './holder.service';

@Controller('holder')
export class HolderController {
    constructor(
        private readonly holderService: HolderService,
        private readonly sessionService: SessionService
    ) {}

    @Post('/credential/accept')
    public async acceptCredential(@Query('credential-id') credentialId: string) {
        return await this.holderService.acceptOffer(this.sessionService.session, credentialId).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.BAD_REQUEST)
        });
    }

    @Post('/credential/decline')
    public async declineCredential(@Query('credential-id') credentialId: string) {
        return await this.holderService.declineOffer(this.sessionService.session, credentialId).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.BAD_REQUEST)
        });
    }

    @Get('/credential')
    public async getCredential(@Query('credential-id') credentialId: string) {
        return await this.holderService.getCred(this.sessionService.session, credentialId).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.BAD_REQUEST)
        });
    }

    @Get('/credentials')
    public async getAllCredentials() {
        return await this.holderService.getAllCreds(this.sessionService.session).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        });
    }

    @Post('/proof/accept')
    public async accepProofRequest(@Query('proof-id') proofId: string) {
        return await this.holderService.acceptProofRequest(this.sessionService.session, proofId).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        });
    }
}
