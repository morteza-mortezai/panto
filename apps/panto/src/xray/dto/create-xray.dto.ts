/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateXrayDto {
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @IsNotEmpty()
  @IsDateString()
  time: number;

  @IsNotEmpty()
  @IsNumber()
  dataLength: number;

  @IsNotEmpty()
  @IsNumber()
  dataVolume: number;
}
