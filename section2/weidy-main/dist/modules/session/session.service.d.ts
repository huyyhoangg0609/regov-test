import { HttpStatus } from '@nestjs/common';
import { AgentSession } from 'src/common/agentSession';
export declare class SessionService {
    session: AgentSession;
    isLogin: boolean;
    login(walletId: string, walletKey: string, seed?: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    logout(): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    createInvitation(): Promise<{
        invitationUrl: string;
        invitation: import("@aries-framework/core").OutOfBandRecord;
    }>;
    acceptInvitation(invitationUrl: string): Promise<{
        invitation: {
            outOfBandRecord: import("@aries-framework/core").OutOfBandRecord;
            connectionRecord?: import("@aries-framework/core").ConnectionRecord;
        };
    }>;
}
