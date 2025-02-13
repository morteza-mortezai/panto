import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSignalDto {
  @IsNotEmpty()
  @IsString()
  xrayId: string;

  @IsNotEmpty()
  @IsNumber()
  time: number;

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
