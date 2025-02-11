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
// import { CreateXrayDto } from './dto/create-xray.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MeasurementDto } from './dto/measurement.dto';

@Controller('xray')
export class XrayController {
  private readonly logger = new Logger(XrayController.name);

  constructor(private readonly xrayService: XrayService) {}

  @EventPattern({ cmd: 'scan' })
  handlePing(@Payload() measurementDto: MeasurementDto) {
    this.logger.log(
      'Received measurementDto: ' + JSON.stringify(measurementDto),
    );
    // You can now process the received measurementDto as needed
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
