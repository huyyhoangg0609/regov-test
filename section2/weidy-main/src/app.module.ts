import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerifierModule } from './modules/verifier/verifier.module';
import { IssuerModule } from './modules/issuer/issuer.module';
import { HolderModule } from './modules/holder/holder.module';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    VerifierModule, 
    IssuerModule, 
    HolderModule, 
    SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
