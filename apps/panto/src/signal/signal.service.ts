/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Signal, SignalDocument } from './schema/signal.schema';
import { SignalFilterDto } from './dto/signal-filter.dto';

@Injectable()
export class SignalService {
  constructor(
    @InjectModel(Signal.name) private signalModel: Model<SignalDocument>,
  ) {}

  async create(createSignalDto: CreateSignalDto): Promise<Signal> {
    const createdSignal = new this.signalModel(createSignalDto);
    return createdSignal.save();
  }
  createMany(createSignalDtos: CreateSignalDto[]) {
    return this.signalModel.insertMany(createSignalDtos);
  }

  async findAll(filters: SignalFilterDto): Promise<Signal[]> {
    const query: any = {};

    // Filter for time
    if (filters.timeFrom !== undefined || filters.timeTo !== undefined) {
      query.time = {};
      if (filters.timeFrom !== undefined) {
        query.time.$gte = filters.timeFrom;
      }
      if (filters.timeTo !== undefined) {
        query.time.$lte = filters.timeTo;
      }
    }

    // Filter for x
    if (filters.xFrom !== undefined || filters.xTo !== undefined) {
      query.x = {};
      if (filters.xFrom !== undefined) {
        query.x.$gte = filters.xFrom;
      }
      if (filters.xTo !== undefined) {
        query.x.$lte = filters.xTo;
      }
    }

    // Filter for y
    if (filters.yFrom !== undefined || filters.yTo !== undefined) {
      query.y = {};
      if (filters.yFrom !== undefined) {
        query.y.$gte = filters.yFrom;
      }
      if (filters.yTo !== undefined) {
        query.y.$lte = filters.yTo;
      }
    }

    // Filter for speed
    if (filters.speedFrom !== undefined || filters.speedTo !== undefined) {
      query.speed = {};
      if (filters.speedFrom !== undefined) {
        query.speed.$gte = filters.speedFrom;
      }
      if (filters.speedTo !== undefined) {
        query.speed.$lte = filters.speedTo;
      }
    }

    return this.signalModel.find(query).exec();
  }

  async findOne(id: string): Promise<Signal> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    const signal = await this.signalModel.findById(id).exec();
    if (!signal) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return signal;
  }

  async findByXrayId(xrayId: string) {
    return this.signalModel.find({ xrayId });
  }

  async update(id: string, updateSignalDto: UpdateSignalDto): Promise<Signal> {
    const updatedSignal = await this.signalModel
      .findByIdAndUpdate(id, updateSignalDto, { new: true })
      .exec();
    if (!updatedSignal) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return updatedSignal;
  }

  async remove(id: string): Promise<Signal> {
    const deletedSignal = await this.signalModel.findByIdAndDelete(id).exec();
    if (!deletedSignal) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return deletedSignal;
  }

  async removeMany(xrayId: string) {
    const result = await this.signalModel.deleteMany({ xrayId });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`No signals found for xrayId ${xrayId}`);
    }

    return result;
  }
}
