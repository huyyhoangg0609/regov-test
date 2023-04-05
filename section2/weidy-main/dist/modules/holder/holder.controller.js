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
exports.HolderController = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("../session/session.service");
const holder_service_1 = require("./holder.service");
let HolderController = class HolderController {
    constructor(holderService, sessionService) {
        this.holderService = holderService;
        this.sessionService = sessionService;
    }
    async acceptCredential(credentialId) {
        return await this.holderService.acceptOffer(this.sessionService.session, credentialId).catch(e => {
            throw new common_1.HttpException("error: " + e, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async declineCredential(credentialId) {
        return await this.holderService.declineOffer(this.sessionService.session, credentialId).catch(e => {
            throw new common_1.HttpException("error: " + e, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getCredential(credentialId) {
        return await this.holderService.getCred(this.sessionService.session, credentialId).catch(e => {
            throw new common_1.HttpException("error: " + e, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getAllCredentials() {
        return await this.holderService.getAllCreds(this.sessionService.session).catch(e => {
            throw new common_1.HttpException("error: " + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async accepProofRequest(proofId) {
        return await this.holderService.acceptProofRequest(this.sessionService.session, proofId).catch(e => {
            throw new common_1.HttpException("error: " + e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
};
__decorate([
    (0, common_1.Post)('/credential/accept'),
    __param(0, (0, common_1.Query)('credential-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolderController.prototype, "acceptCredential", null);
__decorate([
    (0, common_1.Post)('/credential/decline'),
    __param(0, (0, common_1.Query)('credential-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolderController.prototype, "declineCredential", null);
__decorate([
    (0, common_1.Get)('/credential'),
    __param(0, (0, common_1.Query)('credential-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolderController.prototype, "getCredential", null);
__decorate([
    (0, common_1.Get)('/credentials'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HolderController.prototype, "getAllCredentials", null);
__decorate([
    (0, common_1.Post)('/proof/accept'),
    __param(0, (0, common_1.Query)('proof-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolderController.prototype, "accepProofRequest", null);
HolderController = __decorate([
    (0, common_1.Controller)('holder'),
    __metadata("design:paramtypes", [holder_service_1.HolderService,
        session_service_1.SessionService])
], HolderController);
exports.HolderController = HolderController;
//# sourceMappingURL=holder.controller.js.map