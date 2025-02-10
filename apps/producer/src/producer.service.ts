// در اپلیکیشن B: data.service.ts
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'my_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async getData() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await this.client
      .send({ cmd: 'get_data' }, { info: 'درخواست از اپ B' })
      .toPromise();
    return result;
  }
}
