import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XrayService } from './xray.service';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';

@Controller('xray')
export class XrayController {
  constructor(private readonly xrayService: XrayService) {}

  @Post()
  create(@Body() createXrayDto: CreateXrayDto) {
    return this.xrayService.create(createXrayDto);
  }

  @Get()
  findAll() {
    return this.xrayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xrayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXrayDto: UpdateXrayDto) {
    return this.xrayService.update(+id, updateXrayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xrayService.remove(+id);
  }
}
