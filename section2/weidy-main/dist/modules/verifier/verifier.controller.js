"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifierController = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("../session/session.service");
const verifier_service_1 = require("./verifier.service");
let VerifierController = class VerifierController {
    constructor(verifierService, sessionService) {
        this.verifierService = verifierService;
        this.sessionService = sessionService;
    }
    async requestProof(credDefId) {
        return await this.verifierService.createProofRequest(this.sessionService.session, credDefId).catch(e => {
            throw new common_1.HttpException("error: " + e, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async verifyProof(proofId) {
        return await this.verifierService.checkProof(this.sessionService.session, proofId).catch(e => {
            throw new common_1.HttpException("error: " + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
__decorate([
    (0, common_1.Post)('/request/create'),
    __param(0, (0, common_1.Query)('cred-def-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerifierController.prototype, "requestProof", null);
__decorate([
    (0, common_1.Get)('/proof/verify'),
    __param(0, (0, common_1.Query)('proof-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerifierController.prototype, "verifyProof", null);
VerifierController = __decorate([
    (0, common_1.Controller)('verifier'),
    __metadata("design:paramtypes", [verifier_service_1.VerifierService,
        session_service_1.SessionService])
], VerifierController);
exports.VerifierController = VerifierController;
//# sourceMappingURL=verifier.controller.js.map