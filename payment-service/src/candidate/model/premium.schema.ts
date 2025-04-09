import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export type PremiumPaymentDocument = PremiumPayment & Document

@Schema({ timestamps: true })
export class PremiumPayment extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
    candidateId: Types.ObjectId;

    @Prop({ type: Number, required: true })
    amount: number;

    @Prop({ type: String, required: true, enum: ['pending', 'completed', 'failed', 'admin send'] })
    paymentStatus: string;

    @Prop({ type: String, required: true, })
    paymentMethod: string;

    @Prop({ type: String, required: true, unique: true })
    transactionId: string;


    @Prop({ type: String, required: true })
    duration: string
};

export const PremiumPaymentSchema = SchemaFactory.createForClass(PremiumPayment);