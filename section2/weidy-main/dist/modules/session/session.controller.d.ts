import { SessionService } from './session.service';
import { LoginWalletDto } from 'src/common/dtos/loginWallet.dto';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    login(keyDto: LoginWalletDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    logout(): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    createInvitation(): Promise<{
        invitationUrl: string;
        invitation: import("@aries-framework/core").OutOfBandRecord;
    }>;
    accepInvitation(invitationUrl: string): Promise<{
        invitation: {
            outOfBandRecord: import("@aries-framework/core").OutOfBandRecord;
            connectionRecord?: import("@aries-framework/core").ConnectionRecord;
        };
    }>;
}
