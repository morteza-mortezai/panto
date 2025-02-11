import { Injectable } from '@nestjs/common';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';

@Injectable()
export class XrayService {
  create(createXrayDto: CreateXrayDto) {
    return 'This action adds a new xray';
  }

  findAll() {
    return `This action returns all xray`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xray`;
  }

  update(id: number, updateXrayDto: UpdateXrayDto) {
    return `This action updates a #${id} xray`;
  }

  remove(id: number) {
    return `This action removes a #${id} xray`;
  }
}
