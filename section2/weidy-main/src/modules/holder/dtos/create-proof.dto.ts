import { Proof, ProofRequest } from '@aries-framework/core';
import { IsString, IsNotEmpty } from 'class-validator';
import { CredentialDefs, IndyProof, IndyProofRequest, Schemas } from 'indy-sdk';

export class ProofDto {
  @IsNotEmpty()
  proof: IndyProof;

  @IsNotEmpty()
  proofRequest: IndyProofRequest;

  @IsNotEmpty()
  schemas: Schemas;

  @IsNotEmpty()
  credDefs: CredentialDefs;
}
