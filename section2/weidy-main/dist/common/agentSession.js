"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentSession = void 0;
const core_1 = require("@aries-framework/core");
const node_1 = require("@aries-framework/node");
class AgentSession {
    constructor(agentPort, agentLabel, walletConfig, ledgerConfig, didSeed) {
        const agentConfig = {
            endpoints: [`http://localhost:${agentPort}`],
            label: agentLabel,
            walletConfig: walletConfig,
            indyLedgers: [ledgerConfig],
            publicDidSeed: didSeed,
            autoAcceptConnections: true,
            autoAcceptCredentials: core_1.AutoAcceptCredential.ContentApproved,
        };
        this.agentConfig = agentConfig;
        this.agentPort = agentPort;
        const agent = new core_1.Agent({
            config: agentConfig,
            dependencies: node_1.agentDependencies
        });
        this.agent = agent;
        this.agentData = {};
        this.agent.registerInboundTransport(new node_1.HttpInboundTransport({ port: agentPort }));
        this.agent.registerOutboundTransport(new core_1.HttpOutboundTransport());
        this.agent.registerOutboundTransport(new core_1.WsOutboundTransport());
        this.agent.events.on(core_1.ConnectionEventTypes.ConnectionStateChanged, async ({ payload }) => {
            if (payload.connectionRecord.state === core_1.DidExchangeState.Completed) {
                console.log(process.env.ACTOR + ` have connected successful: `, payload);
                this.agentData.connectionId = payload.connectionRecord.id;
            }
        });
    }
    async login() {
        console.log("Agent Session is running on port: " + this.agentPort);
        return await this.agent.initialize();
    }
    async logout() {
        this.agentPort = 0;
        console.log("Agent Session is shutdown!");
        return await this.agent.shutdown();
    }
}
exports.AgentSession = AgentSession;
//# sourceMappingURL=agentSession.js.map