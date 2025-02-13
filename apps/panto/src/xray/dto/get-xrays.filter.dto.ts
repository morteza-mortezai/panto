import { IsOptional, IsNumber, IsString } from 'class-validator';

export class GetXrayFilterDto {
  @IsOptional()
  @IsNumber()
  from?: number;

  @IsOptional()
  @IsNumber()
  to?: number;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @IsNumber()
  minDataVolume?: number;

  @IsOptional()
  @IsNumber()
  maxDataVolume?: number;
}
