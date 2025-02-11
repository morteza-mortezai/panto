import { Injectable } from '@nestjs/common';
import { MeasurementDto } from './dto/measurement.dto';

@Injectable()
export class PocessXrayService {
  processSignal(measurementDto: MeasurementDto) {
    const { deviceId } = measurementDto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { time } = measurementDto[deviceId];
    console.log(deviceId, time);
  }
}
