import { NestFactory } from '@nestjs/core';
import { ProducerModule } from './producer.module';

async function bootstrap() {
  const app = await NestFactory.create(ProducerModule);
  await app.listen(process.env.port ?? 3002);
  console.log('Producer is running on port 3001');
}
bootstrap();
