import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { SignalMessageDto } from './measurement.dto';

export class CreateXrayDto2 {
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @IsNotEmpty()
  @IsInt()
  time: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SignalMessageDto)
  data: SignalMessageDto[];
}
