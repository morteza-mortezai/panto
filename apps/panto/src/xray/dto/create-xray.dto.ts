/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

export class CreateXrayDto {
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @IsNotEmpty()
  @IsInt()
  time: number;

  @IsNotEmpty()
  @IsNumber()
  dataLength: number;

  @IsNotEmpty()
  @IsNumber()
  dataVolume: number;
}
