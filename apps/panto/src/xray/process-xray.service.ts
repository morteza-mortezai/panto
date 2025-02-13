/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { MeasurementDto } from './dto/measurement.dto';
import { XrayService } from './xray.service';
import { SignalService } from '../signal/signal.service';

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
      xray_id: xray._id.toString(),
      time: d[0],
      x: d[1][0],
      y: d[1][1],
      speed: d[1][2],
    }));

    return this.signalService.createMany(refinedData);
  }
}
