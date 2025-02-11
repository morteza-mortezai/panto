/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { MeasurementDto } from './dto/measurement.dto';
import { XrayService } from './xray.service';
import { SignalService } from '../signal/signal.service';

@Injectable()
export class PocessXrayService {
  constructor(
    private readonly xrayService: XrayService,
    private readonly signalService: SignalService,
  ) {}
  async processSignal(measurementDto: MeasurementDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    const deviceId = Object.keys(measurementDto)[0];
    if (!deviceId) throw new BadRequestException('Device Id is not provided');
    const time = measurementDto[deviceId].time;
    if (!time) throw new BadRequestException('Time is not provided');
    const data = measurementDto[deviceId].data;

    const dataLength = data.length;
    console.log(dataLength)
    const dataVolume = Buffer.byteLength(JSON.stringify(data), 'utf8');

    const xray = await this.xrayService.create({
      deviceId,
      time,
      dataLength,
      dataVolume,
    });

    const d = data.map((d) => ({
      xray_id: xray._id.toString(),
      time: d[0],
      x: d[1][0],
      y: d[1][1],
      speed: d[1][2],
    }));
    this.signalService.createMany(d);
  }
}
