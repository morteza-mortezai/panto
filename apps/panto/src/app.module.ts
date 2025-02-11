import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignalModule } from './signal/signal.module';
import { XrayModule } from './xray/xray.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    SignalModule,
    XrayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
