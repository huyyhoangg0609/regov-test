import { CredentialDefs, IndyProof, IndyProofRequest, Schemas } from 'indy-sdk';
export declare class ProofDto {
    proof: IndyProof;
    proofRequest: IndyProofRequest;
    schemas: Schemas;
    credDefs: CredentialDefs;
}
