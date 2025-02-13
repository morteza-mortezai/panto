import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Xray, XrayDocument } from './schema/xray.schema';
import { Model, Types } from 'mongoose';
import { GetXrayFilterDto } from './dto/get-xrays.filter.dto';

@Injectable()
export class XrayService {
  constructor(@InjectModel(Xray.name) private xrayModel: Model<XrayDocument>) {}

  async create(createXrayDto: CreateXrayDto) {
    const createdRecord = await this.xrayModel.create(createXrayDto);
    return createdRecord.save();
  }

  async findAll(filters: GetXrayFilterDto) {
    const query: any = {};

    if (filters.from !== undefined || filters.to !== undefined) {
      query.time = {};
      if (filters.from !== undefined) query.time.$gte = filters.from;
      if (filters.to !== undefined) query.time.$lte = filters.to;
    }

    if (filters.deviceId) {
      query.deviceId = filters.deviceId;
    }

    if (
      filters.minDataVolume !== undefined ||
      filters.maxDataVolume !== undefined
    ) {
      query.dataVolume = {};
      if (filters.minDataVolume !== undefined)
        query.dataVolume.$gte = filters.minDataVolume;
      if (filters.maxDataVolume !== undefined)
        query.dataVolume.$lte = filters.maxDataVolume;
    }

    return await this.xrayModel.find(query).exec();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    const xray = await this.xrayModel.findById(id).exec();
    if (!xray) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return xray;
  }

  update(id: string, updateXrayDto: UpdateXrayDto) {
    return this.xrayModel.findByIdAndUpdate(id, updateXrayDto).exec();
  }

  async remove(id: string) {
    return await this.xrayModel.findByIdAndDelete(id).exec();
  }
}
