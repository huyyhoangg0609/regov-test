"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuerService = void 0;
const common_1 = require("@nestjs/common");
let IssuerService = class IssuerService {
    async createCredCredentialSchemaAndDef(issuer, schemaInput) {
        if (!issuer) {
            throw new common_1.BadRequestException('Please login first.');
        }
        console.log(schemaInput.name);
        const schemaTemplate = {
            name: schemaInput.name,
            version: '1.0',
            attributes: ['name', 'age', 'country'],
        };
        const schema = await issuer.agent.ledger.registerSchema(schemaTemplate).catch(e => {
            throw new common_1.BadRequestException(e);
        });
        const schemaDef = await issuer.agent.ledger.registerCredentialDefinition({
            schema: schema,
            tag: 'CI1',
            supportRevocation: false,
        }).catch(e => {
            throw new common_1.BadRequestException(e);
        });
        issuer.agentData.credDefId = schemaDef.id;
        console.log('Storing cred defs: ', schema.id, schemaDef.id);
        return {
            schema,
            schemaDef,
        };
    }
    async offerCredential(issuer, payload, credDefId) {
        console.log("Creating credentail...");
        console.log("Connection ID: " + issuer.agentData.connectionId);
        console.log("Credential Def ID: " + credDefId);
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
};
IssuerService = __decorate([
    (0, common_1.Injectable)()
], IssuerService);
exports.IssuerService = IssuerService;
//# sourceMappingURL=issuer.service.js.map