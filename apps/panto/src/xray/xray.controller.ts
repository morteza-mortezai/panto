import {
  Controller,
  // Get,
  // Post,
  Logger,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { XrayService } from './xray.service';
import { ProcessXrayService } from './process-xray.service';
// import { CreateXrayDto } from './dto/create-xray.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MeasurementDto } from './dto/measurement.dto';

@Controller('xray')
export class XrayController {
  private readonly logger = new Logger(XrayController.name);

  constructor(
    private readonly xrayService: XrayService,
    private readonly processXrayService: ProcessXrayService,
  ) {}

  @EventPattern({ cmd: 'scan' })
  handleScan(@Payload() measurementDto: MeasurementDto) {
    return this.processXrayService.processSignal(measurementDto);
  }

  // @Get()
  // findAll() {
  //   return this.xrayService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.xrayService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateXrayDto: UpdateXrayDto) {
  //   return this.xrayService.update(+id, updateXrayDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.xrayService.remove(+id);
  // }
}
