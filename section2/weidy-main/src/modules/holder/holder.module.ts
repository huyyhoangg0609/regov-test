import { Module } from '@nestjs/common';
import { HolderService } from './holder.service';
import { HolderController } from './holder.controller';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [SessionModule],
  controllers: [HolderController],
  providers: [HolderService],
})
export class HolderModule {}
