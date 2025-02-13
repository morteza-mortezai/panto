import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import xray from './x-ray';

@Injectable()
export class ProducerService {

  constructor(
    @Inject('PANTO_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  async produceXrayData() {
    await this.client.connect();
    return this.client.emit({ cmd: 'scan' }, xray);
  }
}
