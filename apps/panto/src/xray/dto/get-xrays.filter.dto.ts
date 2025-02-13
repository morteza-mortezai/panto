import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetXrayFilterDto {
  @ApiPropertyOptional({
    description: 'Filter records with time greater than or equal to this value',
    type: Number,
    example: 1620000000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  from?: number;

  @ApiPropertyOptional({
    description: 'Filter records with time less than or equal to this value',
    type: Number,
    example: 1629999999,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  to?: number;

  @ApiPropertyOptional({
    description: 'Device ID for filtering',
    type: String,
    example: 'device-123',
  })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Minimum data volume for filtering',
    type: Number,
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minDataVolume?: number;

  @ApiPropertyOptional({
    description: 'Maximum data volume for filtering',
    type: Number,
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxDataVolume?: number;
}
