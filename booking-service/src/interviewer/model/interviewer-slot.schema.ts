import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type InterviewerSlotDocument = InterviewerSlot & Document;

@Schema({ timestamps: true })
export class InterviewerSlot extends Document {
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'interviewer', required: true })
    interviewerId: Types.ObjectId;

    @Prop({
        type: {
            stackName: { type: String, required: true },
            technologies: { type: String, required: true }
        },
    })
    stack: {
        stackName: string;
        technologies: string;
    };

    @Prop([
        {
            date: { type: Date, required: true },
            schedules: [
                {
                    fromTime: { type: String, required: true },
                    toTime: { type: String, required: true },
                    title: { type: String, required: true },
                    price: { type: Number, required: true },
                    description: { type: String, required: true },
                    status: {type: String, required: true, default: 'open'}
                }
            ]
        }
    ])
    slots: {
        date: Date;
        schedules: {
            fromTime: string;
            toTime: string;
            title: string;
            price: number;
            description: string;
            status: string;
        }[];
    }[];
}

export const InterviewerSlotSchema = SchemaFactory.createForClass(InterviewerSlot);
