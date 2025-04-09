import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CandidateDocument = Candidate & Document;

@Schema({ timestamps: true, collection: 'candidates' })
export class Candidate extends Document {

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    mobile: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true, default: '' })
    password: string;

    @Prop({ type: Boolean, required: true, default: false })
    isBlocked: boolean;

    @Prop({ type: Boolean, default: false })
    isVerified: boolean;

    @Prop({ type: Number })
    OTP: number;

    @Prop({ type: String })
    profileURL: string

    @Prop({type: Boolean, default: false})
    premium: boolean

    @Prop({ type: Date, default: () => new Date(Date.now() + 2 * 60 * 1000) }) // Corrected typo for 'expaireAt' to 'expireAt'
    expaireAt: Date; // Renamed property to 'expireAt' for better clarity
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
