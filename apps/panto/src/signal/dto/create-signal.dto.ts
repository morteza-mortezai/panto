/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsMongoId, IsDateString, IsNumber } from 'class-validator';

export class CreateSignalDto {
  @IsNotEmpty()
  @IsMongoId()
  device_id: string;

  @IsNotEmpty()
  @IsDateString()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  x: number;

  @IsNotEmpty()
  @IsNumber()
  y: number;

  @IsNotEmpty()
  @IsNumber()
  speed: number;
}
