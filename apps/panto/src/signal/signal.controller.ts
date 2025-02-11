import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SignalService } from './signal.service';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';

@Controller('signal')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Post()
  async create(@Body() createSignalDto: CreateSignalDto) {
    return await this.signalService.create(createSignalDto);
  }

  @Get()
  async findAll() {
    return await this.signalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.signalService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSignalDto: UpdateSignalDto,
  ) {
    return await this.signalService.update(id, updateSignalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.signalService.remove(id);
  }
}
