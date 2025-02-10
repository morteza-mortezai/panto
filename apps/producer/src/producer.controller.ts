import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller()
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  getHello() {
    return this.producerService.getData();
  }
}
