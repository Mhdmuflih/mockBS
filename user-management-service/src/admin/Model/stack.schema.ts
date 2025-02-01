import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StackDocument = Stack & Document;

@Schema()
export class Stack {
  @Prop({ type: String,  required: true })
  stackName: string;

  @Prop({ type: [String] })
  technologies: string[];
}

export const StackSchema = SchemaFactory.createForClass(Stack);
