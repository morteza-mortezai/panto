import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type XrayDocument = HydratedDocument<Xray>;

@Schema()
export class Xray {
  @Prop({ required: true })
  device_id: string;

  @Prop({ required: true })
  time: Date;
}

export const XraySchema = SchemaFactory.createForClass(Xray);
