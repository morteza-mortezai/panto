/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateXrayDto {
  @IsNotEmpty()
  @IsString()
  device_id: string;

  @IsNotEmpty()
  @IsDateString()
  time: string;
}
