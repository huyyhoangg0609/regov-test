import { Body, Controller, Post, Query } from '@nestjs/common';

import { SessionService } from './session.service';
import { LoginDto } from './dto/login.dto';


@Controller('/session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }


    @Post('/login')
    public async login(@Body() keyDto: LoginDto) {
        return await this.sessionService.login(keyDto.walletId,keyDto.walletKey, keyDto.seed);
    }

    @Post('/logout')
    public async logout() {
        return await this.sessionService.logout();
    }

    @Post('/invitation/create')
    public async createInvitation() {
        return await this.sessionService.createInvitation();
    }

    @Post('/invitation/accept')
    public async accepInvitation(@Query('invitation-url') invitationUrl: string) {
        return await this.sessionService.acceptInvitation(invitationUrl);
    }
}
