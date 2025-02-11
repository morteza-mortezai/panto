/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SignalMessageDto {
  @IsNotEmpty()
  @IsNumber()
  measurementTime: number;

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

export class CreateXrayMessageDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SignalMessageDto)
  data: SignalMessageDto[];

  @IsNotEmpty()
  @IsNumber()
  time: number;
}

export class MeasurementDto {
  [deviceId: string]: CreateXrayMessageDto;
}
