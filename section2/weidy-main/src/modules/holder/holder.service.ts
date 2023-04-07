import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchemaStatus } from 'src/common/schema/createStatus.schema';
import { AgentSession } from '../session/entity/agentSession';

@Injectable()
export class HolderService {

    public async acceptOffer(holder: AgentSession, credentialId?: string) {
        console.log("Accepting Credential...");
        const result = await holder.agent.credentials.acceptOffer({ 
            credentialRecordId: credentialId || holder.agentData.credentialId 
        });
        const status = (result.state === 'request-sent') ? CreateSchemaStatus.SUCCESS : CreateSchemaStatus.FAIL;
        console.log("Accepting Credential Status:", status);
        return {statusCode: HttpStatus.OK, message: {
            credential: {
                id: result.id,
                status: status,
                attributes: result.credentialAttributes
            }
        }};
    }

    public async declineOffer(holder: AgentSession, credentialId?: string) {
        console.log("Declining Credential...");
        const result = await holder.agent.credentials.declineOffer(credentialId || holder.agentData.credentialId);
        console.log("Declining Credential Status:", result.state);
        return {statusCode: HttpStatus.OK, message: {
            credential: {
                id: result.id,
                status: result.state,
                attributes: result.credentialAttributes
            }
        }};
    }

    public async getCred(holder: AgentSession, credentialId?: string) {
        return await holder.agent.credentials.getById(credentialId || holder.agentData.credentialId);
    }

    public async getAllCreds(holder: AgentSession) {
        return await holder.agent.credentials.getAll();
    }

    public async acceptProofRequest(holder: AgentSession, proofId?: string) {
        const targetproofId = proofId || holder.agentData.proofId
        console.log("targetproofId: ", targetproofId)

        const creds = await holder.agent.proofs.autoSelectCredentialsForProofRequest({
            proofRecordId: targetproofId
        });

        await holder.agent.proofs.acceptRequest({
            proofRecordId: targetproofId,
            proofFormats: {
                indy: creds.proofFormats.indy
            }
        })
        return creds;
    }
}
