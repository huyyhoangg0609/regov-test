import { Injectable, HttpStatus } from '@nestjs/common';
import {  WalletConfig } from '@aries-framework/core';

import { AgentSession } from 'src/common/agentSession';
import { ledgerPoolConfig } from 'src/common/ledger.config';

@Injectable()
export class SessionService {

    public session: AgentSession;
    public isLogin: boolean;

    async login(walletId: string, walletKey: string, seed?: string) { 
        if (this.isLogin) {
            return {statusCode: HttpStatus.OK, message: "You have already login!!!"}
        }
        const agentPort: number = process.env.AGENT_PORT ? parseInt(process.env.AGENT_PORT) : 9000;

        // CREATE WALLET CONFIG
        const walletConfig: WalletConfig = {
            id: walletId,
            key: walletKey, 
        }
        console.log("WalletID: "+ walletConfig.id);

        // START SESSION
        const newSession = new AgentSession(agentPort, process.env.ACTOR, walletConfig, ledgerPoolConfig, seed);
        this.session = newSession;
        await this.session.login();
        this.isLogin = true;
        return {statusCode: HttpStatus.OK, message: "Login succesful!!!"}
    }

    async logout () {
        if (!this.isLogin) {
            return {statusCode: HttpStatus.OK, message: "You not log in yet!"}
        }
        await this.session.logout();
        this.isLogin = false;
        return {statusCode: HttpStatus.OK, message: "Logout succesful!!!"}
    }

    // *********************************************IMPORTANT*****************************************
    async createInvitation() {
        const invitation = await this.session.agent.oob.createInvitation();
        const domain = `http://localhost:${this.session.agentPort}`;
        return {
            invitationUrl: invitation.outOfBandInvitation.toUrl({ domain }),
            invitation
        };
    }

    async acceptInvitation(invitationUrl: string) {
        const invitation = await this.session.agent.oob.receiveInvitationFromUrl(invitationUrl);
        return {invitation: invitation};
    }
    // *********************************************IMPORTANT*****************************************






}
