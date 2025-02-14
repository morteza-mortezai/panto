import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'object identifier for the device',
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @ApiProperty({
    description: 'Timestamp when the data was recorded',
    example: 1618914000000,
  })
  @IsNotEmpty()
  @IsInt()
  time: number;

  @ApiProperty({
    description: 'Array of signal messages',
    type: [SignalMessageDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SignalMessageDto)
  data: SignalMessageDto[];
}
