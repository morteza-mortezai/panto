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
import { CreateXrayDto } from './dto/create-xray.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MeasurementDto } from './dto/measurement.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';
import { GetXrayFilterDto } from './dto/get-xrays.filter.dto';

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
  create(@Body() createXrayDto: CreateXrayDto) {
    return this.xrayService.create(createXrayDto);
  }

  @Get()
  findAll(@Query() filters: GetXrayFilterDto) {
    return this.xrayService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xrayService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXrayDto: UpdateXrayDto) {
    return this.xrayService.update(id, updateXrayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xrayService.remove(id);
  }
}
