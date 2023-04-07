import { Injectable, HttpStatus } from '@nestjs/common';
import {  WalletConfig } from '@aries-framework/core';

import { ledgerPoolConfig } from 'src/common/ledger.config';
import { AgentSession } from './entity/agentSession';
import { ConnectionStatus } from 'src/common/connection/status.connection';

@Injectable()
export class SessionService {

    public session: AgentSession;
    public isLogin: boolean;

    async login(walletId: string, walletKey: string, seed?: string) {
        console.log("Logining...");
        if (this.isLogin) {
            return {statusCode: HttpStatus.OK, message: "You have already login!!!"}
        }
        const agentPort: number = process.env.AGENT_PORT ? parseInt(process.env.AGENT_PORT) : 9000;

        // CREATE WALLET CONFIG
        const walletConfig: WalletConfig = {
            id: walletId,
            key: walletKey, 
        }
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
        console.log("Creating invitation...")
        const invitation = await this.session.agent.oob.createInvitation();
        const domain = `http://localhost:${this.session.agentPort}`;
        const invitationUrl = invitation.outOfBandInvitation.toUrl({ domain });
        return { 
            statusCode: HttpStatus.CREATED,
            message: {
                invitationUrl,
                invitation: {
                    id: invitation.id,
                    label: invitation.outOfBandInvitation.label,
                    state: invitation.state,
                    reuable: invitation.reusable
                }
            }
        }; 
    }

    async acceptInvitation(invitationUrl: string) {
        console.log("Accepting Invitation...")
        const invitation = await this.session.agent.oob.receiveInvitationFromUrl(invitationUrl);
        return { 
            statusCode: HttpStatus.OK,
            message: {
                connectionRecord: {
                    id: invitation.connectionRecord.id,
                    status: (
                        invitation.connectionRecord.state === "request-sent" ? ConnectionStatus.SUCCESS : ConnectionStatus.FAIL
                    ),
                    protocol: invitation.connectionRecord.protocol,
                    autoAcceptConnection: invitation.connectionRecord.autoAcceptConnection,
                    createdAt: invitation.connectionRecord.createdAt
                }
            }
        };
    }







}
