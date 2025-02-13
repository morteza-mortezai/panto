import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class SignalFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  timeFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  timeTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  xFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  xTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  yFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  yTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  speedFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  speedTo?: number;
}
