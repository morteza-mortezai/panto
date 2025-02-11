import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalModule } from './signal/signal.module';
import { XrayModule } from './xray/xray.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    SignalModule,
    XrayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
