import { IssuerService } from './issuer.service';
import { SessionService } from '../session/session.service';
import { CredentialBody } from './dto/credentialBody.dto';
import { SchemaInput } from './dto/schemaInput.dto';
export declare class IssuerController {
    private readonly issuerService;
    private readonly sessionService;
    constructor(issuerService: IssuerService, sessionService: SessionService);
    createSchema(schema: SchemaInput): Promise<any>;
    offerCredential(input: CredentialBody, credDefId?: string): Promise<import("@aries-framework/core").CredentialExchangeRecord>;
}
