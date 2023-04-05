import { Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agentSession';

@Injectable()
export class VerifierService{

  public async checkProof(verifier: AgentSession, proofId: string) {
    const proofRecord = await verifier.agent.proofs.findById(proofId || verifier.agentData.proofId);
    const presentation = await verifier.agent.proofs.findPresentationMessage(proofId || verifier.agentData.proofId)

    return {proofRecord, presentation};
  }

  public async createProofRequest(verifier: AgentSession, credDefId: string) {
    const proofRecord = await verifier.agent.proofs.requestProof({
      protocolVersion: 'v1',
      connectionId: verifier.agentData.connectionId,
      proofFormats: {
        indy: {
          requestedAttributes: {
            attr1_referent: {
              name: 'name',
              restrictions: [
                { credentialDefinitionId: credDefId },
              ],
            },
            attr2_referent: {
              name: 'age',
              restrictions: [
                { credentialDefinitionId: credDefId },
              ],
            },
            attr3_referent: {
              name: 'country',
              restrictions: [
                { credentialDefinitionId: credDefId },
              ],
            },
          },
        },
      },
    });

    verifier.agentData.proofId = proofRecord.id;
    return proofRecord;
  }
}
