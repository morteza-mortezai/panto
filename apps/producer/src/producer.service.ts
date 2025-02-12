import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import xray from './x-ray';

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'x_ray',
        queueOptions: { durable: false },
      },
    });
  }

  produceXrayData() {
    // Emit an event with the pattern { cmd: 'x_ray' } and payload { data: xray }
    return this.client.emit({ cmd: 'scan' }, xray);
  }
}
