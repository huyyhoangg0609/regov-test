import { Agent, InitConfig, WalletConfig, IndyPoolConfig } from '@aries-framework/core';
import { AgentData } from './agentData';
export declare class AgentSession {
    agent: Agent;
    agentPort: number;
    agentData: AgentData;
    agentConfig: InitConfig;
    constructor(agentPort: number, agentLabel: string, walletConfig: WalletConfig, ledgerConfig: IndyPoolConfig, didSeed: string);
    login(): Promise<void>;
    logout(): Promise<void>;
}
