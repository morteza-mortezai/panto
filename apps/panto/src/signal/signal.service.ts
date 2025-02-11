import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSignalDto } from './dto/create-signal.dto';
import { UpdateSignalDto } from './dto/update-signal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal, SignalDocument } from './schema/signal.schema';

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
  async findAll(): Promise<Signal[]> {
    return this.signalModel.find().exec();
  }

  async findOne(id: string): Promise<Signal> {
    const signal = await this.signalModel.findById(id).exec();
    if (!signal) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return signal;
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
}
