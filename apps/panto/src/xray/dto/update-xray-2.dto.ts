import { PartialType } from '@nestjs/mapped-types';
import { CreateXrayDto2 } from './create-xray-2.dto';

export class UpdateXrayDto2 extends PartialType(CreateXrayDto2) {}
