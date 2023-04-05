import { SessionService } from '../session/session.service';
import { VerifierService } from './verifier.service';
export declare class VerifierController {
    private readonly verifierService;
    private readonly sessionService;
    constructor(verifierService: VerifierService, sessionService: SessionService);
    requestProof(credDefId: string): Promise<import("@aries-framework/core").ProofExchangeRecord>;
    verifyProof(proofId?: string): Promise<{
        proofRecord: import("@aries-framework/core").ProofExchangeRecord;
        presentation: import("@aries-framework/core").V2PresentationMessage | import("@aries-framework/core").V1PresentationMessage;
    }>;
}
