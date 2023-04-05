import { AgentSession } from 'src/common/agentSession';
import { CredentialBody } from './dto/credentialBody.dto';
import { SchemaInput } from './dto/schemaInput.dto';
export declare class IssuerService {
    createCredCredentialSchemaAndDef(issuer: AgentSession, schemaInput: SchemaInput): Promise<any>;
    offerCredential(issuer: AgentSession, payload: CredentialBody, credDefId?: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
}
