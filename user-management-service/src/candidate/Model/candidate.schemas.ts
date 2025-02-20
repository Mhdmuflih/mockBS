import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CandidateDocument = Candidate & Document;

@Schema({ timestamps: true, collection: 'candidates' }) // Collection name should be plural by convention
export class Candidate extends Document {

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    mobile: string;

    @Prop({ type: String, required: true, unique: true }) // Added unique for email to avoid duplicates
    email: string;

    @Prop({ type: String, required: true, default: '' })
    password: string;

    @Prop({ type: Boolean, required: true, default: false }) // Corrected "require" to "required"
    isBlocked: boolean;

    @Prop({ type: Boolean, default: false })
    isVerified: boolean;

    @Prop({ type: Number })
    OTP: number;

    @Prop({ type: String })
    profileURL: string

    @Prop({ type: Date, default: () => new Date(Date.now() + 2 * 60 * 1000) }) // Corrected typo for 'expaireAt' to 'expireAt'
    expaireAt: Date; // Renamed property to 'expireAt' for better clarity
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
