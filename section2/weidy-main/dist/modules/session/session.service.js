"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const agentSession_1 = require("../../common/agentSession");
const ledger_config_1 = require("../../common/ledger.config");
let SessionService = class SessionService {
    async login(walletId, walletKey, seed) {
        if (this.isLogin) {
            return { statusCode: common_1.HttpStatus.OK, message: "You have already login!!!" };
        }
        const agentPort = process.env.AGENT_PORT ? parseInt(process.env.AGENT_PORT) : 9000;
        const walletConfig = {
            id: walletId,
            key: walletKey,
        };
        console.log("WalletID: " + walletConfig.id);
        const newSession = new agentSession_1.AgentSession(agentPort, process.env.ACTOR, walletConfig, ledger_config_1.ledgerPoolConfig, seed);
        this.session = newSession;
        await this.session.login();
        this.isLogin = true;
        return { statusCode: common_1.HttpStatus.OK, message: "Login succesful!!!" };
    }
    async logout() {
        if (!this.isLogin) {
            return { statusCode: common_1.HttpStatus.OK, message: "You not log in yet!" };
        }
        await this.session.logout();
        this.isLogin = false;
        return { statusCode: common_1.HttpStatus.OK, message: "Logout succesful!!!" };
    }
    async createInvitation() {
        const invitation = await this.session.agent.oob.createInvitation();
        const domain = `http://localhost:${this.session.agentPort}`;
        return {
            invitationUrl: invitation.outOfBandInvitation.toUrl({ domain }),
            invitation
        };
    }
    async acceptInvitation(invitationUrl) {
        const invitation = await this.session.agent.oob.receiveInvitationFromUrl(invitationUrl);
        return { invitation: invitation };
    }
};
SessionService = __decorate([
    (0, common_1.Injectable)()
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map