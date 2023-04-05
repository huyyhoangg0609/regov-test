import { AgentSession } from 'src/common/agentSession';
export declare class VerifierService {
    checkProof(verifier: AgentSession, proofId: string): Promise<{
        proofRecord: import("@aries-framework/core").ProofExchangeRecord;
        presentation: import("@aries-framework/core").V2PresentationMessage | import("@aries-framework/core").V1PresentationMessage;
    }>;
    createProofRequest(verifier: AgentSession, credDefId: string): Promise<import("@aries-framework/core").ProofExchangeRecord>;
}
