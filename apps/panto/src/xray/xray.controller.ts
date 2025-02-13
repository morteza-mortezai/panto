import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Post,
} from '@nestjs/common';
import { XrayService } from './xray.service';
import { ProcessXrayService } from './process-xray.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MeasurementDto } from './dto/measurement.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';
import { GetXrayFilterDto } from './dto/get-xrays.filter.dto';
import { CreateXrayDto2 } from './dto/create-xray-2.dto';

@Controller('xray')
export class XrayController {
  constructor(
    private readonly xrayService: XrayService,
    private readonly processXrayService: ProcessXrayService,
  ) {}

  @EventPattern({ cmd: 'scan' })
  handleScan(@Payload() measurementDto: MeasurementDto) {
    return this.processXrayService.processSignal(measurementDto);
  }

  @Post()
  create(@Body() createXrayDto2: CreateXrayDto2) {
    return this.processXrayService.createXray(createXrayDto2);
  }

  @Get()
  findAll(@Query() filters: GetXrayFilterDto) {
    return this.xrayService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processXrayService.getXray(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXrayDto: UpdateXrayDto) {
    return this.processXrayService.updateXray(id, updateXrayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processXrayService.removeXray(id);
  }
}
