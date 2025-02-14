import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class SignalFilterDto {
  @ApiPropertyOptional({
    description: 'Minimum time filter',
    type: Number,
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  timeFrom?: number;

  @ApiPropertyOptional({
    description: 'Maximum time filter',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  timeTo?: number;

  @ApiPropertyOptional({
    description: 'Minimum x filter',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  xFrom?: number;

  @ApiPropertyOptional({
    description: 'Maximum x filter',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  xTo?: number;

  @ApiPropertyOptional({
    description: 'Minimum y filter',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  yFrom?: number;

  @ApiPropertyOptional({
    description: 'Maximum y filter',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  yTo?: number;

  @ApiPropertyOptional({
    description: 'Minimum speed filter',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  speedFrom?: number;

  @ApiPropertyOptional({
    description: 'Maximum speed filter',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  speedTo?: number;
}
