import { SchemaTemplate } from '@aries-framework/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agentSession';
import { CredentialBody } from './dto/credentialBody.dto';
import { SchemaInput } from './dto/schemaInput.dto';


@Injectable()
export class IssuerService {

    public async createCredCredentialSchemaAndDef(issuer: AgentSession, schemaInput: SchemaInput): Promise<any> {
        if (!issuer) {
            throw new BadRequestException('Please login first.')
        }
        console.log(schemaInput.name)
        const schemaTemplate: SchemaTemplate = {
            name: schemaInput.name,
            version: '1.0',
            attributes: ['name', 'age', 'country'],
        };
        const schema = await issuer.agent.ledger.registerSchema(schemaTemplate).catch(e => {
            throw new BadRequestException(e)
        });
        const schemaDef = await issuer.agent.ledger.registerCredentialDefinition({
            schema: schema,
            tag: 'CI1',
            supportRevocation: false,
        }).catch(e => {
            throw new BadRequestException(e)
        });

        issuer.agentData.credDefId = schemaDef.id
        console.log('Storing cred defs: ', schema.id, schemaDef.id)
        return {
            schema,
            schemaDef,
        };
    }


    public async offerCredential(issuer: AgentSession, payload: CredentialBody, credDefId?: string) {
        console.log("Creating credentail...")
        console.log("Connection ID: "+ issuer.agentData.connectionId);
        console.log("Credential Def ID: "+ credDefId)
        console.log(payload);
        console.log("Agent Port:" + issuer.agentPort);

        return await issuer.agent.credentials.offerCredential({
            protocolVersion: 'v1',
            connectionId: issuer.agentData.connectionId,
            credentialFormats: {
                indy: {
                    credentialDefinitionId: credDefId,
                    attributes: [
                        { name: 'name', value: payload.name },
                        { name: 'age', value: payload.age },
                        { name: 'country', value: payload.country },
                    ],
                },
            },
        });
    }


    
}
