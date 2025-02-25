import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Scheduled', required: true }) // Ensure correct model name
    slotId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Candidate', required: true }) // Ensure correct model name
    candidateId: Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Interviewer', required: true }) // Ensure correct model name
    interviewerId: Types.ObjectId;

    @Prop({ type: Number, required: true }) // Consider using Decimal128 if high precision is needed
    amount: number;

    @Prop({ type: String, required: true, enum: ['pending', 'completed', 'failed'] }) // Enum for better validation
    status: string;

    @Prop({ type: String, required: true, enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'] }) // Enum for controlled values
    paymentMethod: string;

    @Prop({ type: String, required: true, unique: true }) // Unique transaction ID to avoid duplication
    transactionId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
