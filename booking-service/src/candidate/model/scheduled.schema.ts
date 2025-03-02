import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ScheduledDocument = Scheduled & Document;

@Schema({ timestamps: true })
export class Scheduled {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'candidate', required: true })
    candidateId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'interviewer', required: true })
    interviewerId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'schedule', required: true })
    scheduleId: Types.ObjectId;

    @Prop({ type: {stack: String,technology: String,date: String,from: String,to: String,title: String,price: Number}, required: true })
    scheduledSlot: {
        stack: string;
        technology: string;
        date: string;
        from: string;
        to: string;
        title: string;
        price: number;
    };

    @Prop({ type: String, required: true, default: "pending" })
    status: string;
}

export const ScheduledSchema = SchemaFactory.createForClass(Scheduled);
