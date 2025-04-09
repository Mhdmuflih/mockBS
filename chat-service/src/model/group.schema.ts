import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Group extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: [{ candidateId: String, role: String }],
    default: []
  })
  members: { candidateId: string; role: string }[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
