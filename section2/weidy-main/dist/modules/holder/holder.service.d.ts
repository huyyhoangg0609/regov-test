import { AgentSession } from 'src/common/agentSession';
export declare class HolderService {
    acceptOffer(holder: AgentSession, credentialId?: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
    declineOffer(holder: AgentSession, credentialId?: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
    getCred(holder: AgentSession, credentialId?: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
    getAllCreds(holder: AgentSession): Promise<import("@aries-framework/core").CredentialExchangeRecord[]>;
    acceptProofRequest(holder: AgentSession, proofId?: string): Promise<import("@aries-framework/core/build/modules/proofs/models/ProofServiceOptions").FormatRequestedCredentialReturn<[import("@aries-framework/core").IndyProofFormat]>>;
}
