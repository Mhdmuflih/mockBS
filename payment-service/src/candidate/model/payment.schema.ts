import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true }) // Ensure correct model name
    slotId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true }) // Ensure correct model name
    scheduleId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true }) // Ensure correct model name
    candidateId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: true }) // Ensure correct model name
    interviewerId: Types.ObjectId;

    @Prop({
        type:
        {
            stack: { type: String },
            technology: { type: String },
            date: { type: String },
            from: { type: String },
            to: { type: String },
            title: { type: String },
            price: { type: Number, },
        }
    })
    scheduleData: {
        stack: string,
        technology: string,
        date: string,
        from: string,
        to: string,
        title: string,
        price: number
    }

    @Prop({ type: Number, required: true })
    amount: number;

    @Prop({ type: String, required: true, enum: ['pending', 'completed', 'failed'] })
    status: string;

    @Prop({ type: String, required: true, enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'] })
    paymentMethod: string;

    @Prop({type: String, unique: true, required: true})
    transactionId: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
