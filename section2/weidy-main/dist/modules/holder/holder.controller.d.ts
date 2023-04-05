import { SessionService } from '../session/session.service';
import { HolderService } from './holder.service';
export declare class HolderController {
    private readonly holderService;
    private readonly sessionService;
    constructor(holderService: HolderService, sessionService: SessionService);
    acceptCredential(credentialId: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
    declineCredential(credentialId: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
    getCredential(credentialId: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
    getAllCredentials(): Promise<import("@aries-framework/core").CredentialExchangeRecord[]>;
    accepProofRequest(proofId: string): Promise<import("@aries-framework/core/build/modules/proofs/models/ProofServiceOptions").FormatRequestedCredentialReturn<[import("@aries-framework/core").IndyProofFormat]>>;
}
