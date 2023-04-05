import { Agent, InitConfig, WalletConfig, IndyPoolConfig, AutoAcceptCredential, HttpOutboundTransport, 
    WsOutboundTransport, ConnectionStateChangedEvent, ConnectionEventTypes, DidExchangeState } from '@aries-framework/core';
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";
import { AgentData } from './agentData';

export class AgentSession {
    public agent: Agent;
    public agentPort: number;
    public agentData: AgentData
    public agentConfig: InitConfig;

    constructor(agentPort: number,
        agentLabel: string,
        walletConfig: WalletConfig,
        ledgerConfig: IndyPoolConfig,
        didSeed: string
        ) {
        // CONFIG FOR AGENT
        const agentConfig: InitConfig = {
            endpoints: [`http://localhost:${agentPort}`],
            label: agentLabel,
            walletConfig: walletConfig,
            indyLedgers: [ledgerConfig],
            publicDidSeed: didSeed,
            autoAcceptConnections: true,
            autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
        }
        this.agentConfig = agentConfig;
        this.agentPort = agentPort;
      
        // CREATE NEW AGENT
        const agent = new Agent ({
            config: agentConfig,
            dependencies: agentDependencies
        });
        this.agent = agent;
        this.agentData = {};
        this.agent.registerInboundTransport(new HttpInboundTransport({ port: agentPort }));
        this.agent.registerOutboundTransport(new HttpOutboundTransport());
        this.agent.registerOutboundTransport(new WsOutboundTransport());

        this.agent.events.on<ConnectionStateChangedEvent>(
            ConnectionEventTypes.ConnectionStateChanged,
            async ({ payload }) => {
                if (payload.connectionRecord.state === DidExchangeState.Completed) {
                    console.log(process.env.ACTOR+ ` have connected successful: `, payload)
                    // SAVE CONNECTION'S ID
                    this.agentData.connectionId = payload.connectionRecord.id;
                }
            }
        );

    }

    public async login() {
        console.log("Agent Session is running on port: "+ this.agentPort);
        return await this.agent.initialize();
    }

    public async logout() {
        this.agentPort = 0;
        console.log("Agent Session is shutdown!");
        return await this.agent.shutdown();
    }
    
}