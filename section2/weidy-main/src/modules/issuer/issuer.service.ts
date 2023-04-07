import { SchemaTemplate } from '@aries-framework/core';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { AgentSession } from '../session/entity/agentSession';
import { CredentialBody } from './dto/credentialBody.dto';
import { CreateSchemaDto } from './dto/createSchema.dto';
import { CreateSchemaStatus } from 'src/common/schema/createStatus.schema';


@Injectable()
export class IssuerService {

    public async createCredCredentialSchemaAndDef(issuer: AgentSession, schemaDto: CreateSchemaDto): Promise<any> {
        console.log("Creating Schema...");
        if (!issuer) {
            throw new BadRequestException('Please login first.')
        }
        const schemaTemplate: SchemaTemplate = {
            name: schemaDto.name,
            version: schemaDto.version,
            attributes: schemaDto.attributes,
        };
        const schema = await issuer.agent.ledger.registerSchema(schemaTemplate);
        console.log("Schema: ", schema);

        const schemaDef: any = await issuer.agent.ledger.registerCredentialDefinition({
            schema: schema,
            tag: 'CI1',
            supportRevocation: false,
        }).catch(() => {
           throw new BadRequestException("Schema already existed!");
        });
             
        issuer.agentData.credDefId = schemaDef.id;
        return { 
            schema: {
                id: schema.id,
                name: schema.name,
                version: schema.version,
                attributes: schema.attrNames
            },
            schemaDef: {
                id: schemaDef.id,
                version: schemaDef.ver,
                type: schemaDef.type,
                tag: schemaDef.tag,
            }
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
