import { Module } from '@nestjs/common';
import { XrayService } from './xray.service';
import { ProcessXrayService } from './process-xray.service';
import { XrayController } from './xray.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Xray, XraySchema } from './schema/xray.schema';
import { SignalModule } from '../signal/signal.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Xray.name, schema: XraySchema }]),
    SignalModule,
  ],
  controllers: [XrayController],
  providers: [XrayService, ProcessXrayService],
})
export class XrayModule {}
