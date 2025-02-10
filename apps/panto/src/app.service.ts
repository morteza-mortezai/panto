import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    // ایجاد ClientProxy برای ارتباط با RabbitMQ
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'my_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async sendPing(message: any): Promise<any> {
    // ارسال پیام با الگوی { cmd: 'ping' } به میکروسرویس
    return this.client.send({ cmd: 'ping' }, message).toPromise();
  }
}
