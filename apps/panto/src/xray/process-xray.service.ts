/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { MeasurementDto } from './dto/measurement.dto';
import { XrayService } from './xray.service';
import { SignalService } from '../signal/signal.service';
import { CreateXrayDto2 } from './dto/create-xray-2.dto';
import { UpdateXrayDto2 } from './dto/update-xray-2.dto';

@Injectable()
export class ProcessXrayService {
  constructor(
    private readonly xrayService: XrayService,
    private readonly signalService: SignalService,
  ) {}
  async processSignal(measurementDto: MeasurementDto) {
    const deviceId = Object.keys(measurementDto)[0];
    const time = measurementDto[deviceId].time;
    const data = measurementDto[deviceId].data;

    const dataLength = data.length;
    const dataVolume = Buffer.byteLength(JSON.stringify(data), 'utf8');

    const xray = await this.xrayService.create({
      deviceId,
      time,
      dataLength,
      dataVolume,
    });

    // extract data
    const refinedData = data.map((d) => ({
      xrayId: xray._id.toString(),
      time: d[0],
      x: d[1][0],
      y: d[1][1],
      speed: d[1][2],
    }));

    return this.signalService.createMany(refinedData);
  }
  async createXray(createXrayDto2: CreateXrayDto2) {
    const deviceId = createXrayDto2.deviceId;
    const time = createXrayDto2.time;
    const data = createXrayDto2.data;

    const dataLength = data.length;
    const dataVolume = Buffer.byteLength(JSON.stringify(data), 'utf8');

    const xray = await this.xrayService.create({
      deviceId,
      time,
      dataLength,
      dataVolume,
    });
    const refinedData = data.map((d) => ({
      xrayId: xray._id.toString(),
      time: d.time,
      x: d.x,
      y: d.y,
      speed: d.speed,
    }));
    return this.signalService.createMany(refinedData);
  }

  async updateXray(id: string, updateXrayDto2: UpdateXrayDto2) {
    const dataLength = updateXrayDto2.data?.length || undefined;
    let dataVolume: number | undefined = undefined;
    if (dataLength) {
      dataVolume = Buffer.byteLength(
        JSON.stringify(updateXrayDto2.data),
        'utf8',
      );
    }

    await this.xrayService.update(id, {
      deviceId: updateXrayDto2.deviceId,
      time: updateXrayDto2.time,
      dataLength,
      dataVolume,
    });

    // if data exist it will be updated
    if (updateXrayDto2.data) {
      await this.signalService.removeMany(id);
      const data = updateXrayDto2.data;
      const refinedData = data.map((d) => ({
        xrayId: id.toString(),
        time: d.time,
        x: d.x,
        y: d.y,
        speed: d.speed,
      }));
      await this.signalService.createMany(refinedData);
    }
    return { message: 'Xray and associated signals updated successfully' };
  }

  async removeXray(id: string) {
    await this.xrayService.remove(id);
    await this.signalService.removeMany(id);
    return { message: 'successfully deleted' };
  }

  async getXray(xrayId: string) {
    const xray = await this.xrayService.findOne(xrayId);
    const signals = await this.signalService.findByXrayId(xrayId);
    return { ...xray, data: signals };
  }
}
