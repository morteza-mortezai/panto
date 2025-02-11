import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SignalDocument = HydratedDocument<Signal>;

@Schema()
export class Signal {
  @Prop({ type: Types.ObjectId, ref: 'Xray', required: true })
  device_id: Types.ObjectId;

  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: true })
  speed: number;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
