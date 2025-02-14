import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSignalDto {
  @ApiProperty({
    description: 'The Object ID of the x-ray signal',
    example: '67ae5a4260b12e43107da0b1',
  })
  @IsNotEmpty()
  @IsString()
  xrayId: string;

  @ApiProperty({
    description: 'time for the signal',
    example: 500,
  })
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @ApiProperty({ description: 'X coordinate value', example: 12 })
  @IsNotEmpty()
  @IsNumber()
  x: number;

  @ApiProperty({ description: 'Y coordinate value', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  y: number;

  @ApiProperty({ description: 'Speed of the signal', example: 3.5 })
  @IsNotEmpty()
  @IsNumber()
  speed: number;
}
