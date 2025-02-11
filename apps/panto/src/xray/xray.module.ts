import { Module } from '@nestjs/common';
import { XrayService } from './xray.service';
import { XrayController } from './xray.controller';

@Module({
  controllers: [XrayController],
  providers: [XrayService],
})
export class XrayModule {}
