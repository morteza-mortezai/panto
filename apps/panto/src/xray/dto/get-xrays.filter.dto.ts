import { IsOptional, IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetXrayFilterDto {
  @ApiPropertyOptional({
    description: 'Filter records with time greater than or equal to this value',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  from?: number;

  @ApiPropertyOptional({
    description: 'Filter records with time less than or equal to this value',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  to?: number;

  @ApiPropertyOptional({
    description: 'Device ID for filtering',
    type: String,
  })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Minimum data volume for filtering',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minDataVolume?: number;

  @ApiPropertyOptional({
    description: 'Maximum data volume for filtering',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxDataVolume?: number;
}
