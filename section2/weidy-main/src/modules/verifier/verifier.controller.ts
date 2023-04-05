import { Controller, Post, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { VerifierService } from './verifier.service';

@Controller('verifier')
export class VerifierController {
    constructor(
        private readonly verifierService: VerifierService,
        private readonly sessionService: SessionService
    ) { }

    @Post('/request/create')
    public async requestProof(@Query('cred-def-id') credDefId: string) {
        return await this.verifierService.createProofRequest(this.sessionService.session, credDefId).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.BAD_REQUEST)
        });
    }

    @Get('/proof/verify')
    public async verifyProof(@Query('proof-id') proofId?: string) {
        return await this.verifierService.checkProof(
            this.sessionService.session,
            proofId,
        ).catch(e => {
            throw new HttpException("error: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        });
    }
}
