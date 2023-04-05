"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolderService = void 0;
const common_1 = require("@nestjs/common");
let HolderService = class HolderService {
    async acceptOffer(holder, credentialId) {
        return await holder.agent.credentials.acceptOffer({ credentialRecordId: credentialId || holder.agentData.credentialId });
    }
    async declineOffer(holder, credentialId) {
        return await holder.agent.credentials.declineOffer(credentialId || holder.agentData.credentialId);
    }
    async getCred(holder, credentialId) {
        return await holder.agent.credentials.getById(credentialId || holder.agentData.credentialId);
    }
    async getAllCreds(holder) {
        return await holder.agent.credentials.getAll();
    }
    async acceptProofRequest(holder, proofId) {
        const targetproofId = proofId || holder.agentData.proofId;
        console.log("targetproofId: ", targetproofId);
        const creds = await holder.agent.proofs.autoSelectCredentialsForProofRequest({
            proofRecordId: targetproofId
        });
        await holder.agent.proofs.acceptRequest({
            proofRecordId: targetproofId,
            proofFormats: {
                indy: creds.proofFormats.indy
            }
        });
        return creds;
    }
};
HolderService = __decorate([
    (0, common_1.Injectable)()
], HolderService);
exports.HolderService = HolderService;
//# sourceMappingURL=holder.service.js.map