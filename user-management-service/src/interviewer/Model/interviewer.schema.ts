import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InterviewerDocument = Interviewer & Document;

@Schema({ timestamps: true, collection: 'interviewers' }) // Corrected spelling for collection
export class Interviewer {
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  OTP?: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: () => new Date(Date.now() + 2 * 60 * 1000) }) // 2 minutes expiration
  expireAt: Date;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  isVerified?: boolean;

  @Prop({ default: false })
  isApproved?: boolean;

  @Prop({ default: false })
  isDetails?: boolean;

  @Prop()
  currentDesignation?: string;

  @Prop()
  yearOfExperience?: number;

  @Prop()
  university?: string;

  @Prop()
  organization?: string;

  @Prop()
  introduction?: string;

  @Prop()
  profileURL?: string;

  @Prop()
  resumeURL?: string;

  @Prop()
  salarySlipURL?: string;
}

export const InterviewerSchema = SchemaFactory.createForClass(Interviewer);
