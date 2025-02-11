import { Injectable } from '@nestjs/common';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Xray, XrayDocument } from './schema/xray.schema';
import { Model } from 'mongoose';

@Injectable()
export class XrayService {
  constructor(@InjectModel(Xray.name) private xrayModel: Model<XrayDocument>) {}

  async create(createXrayDto: CreateXrayDto) {
    const createdRecord = await this.xrayModel.create(createXrayDto);
    return createdRecord.save();
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
