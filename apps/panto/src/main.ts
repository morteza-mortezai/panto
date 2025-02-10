import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'xray',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices(); // راه‌اندازی تمام میکروسرویس‌های متصل
  await app.listen(3000);
  console.log('Application is running on port 3000');
}
bootstrap();
