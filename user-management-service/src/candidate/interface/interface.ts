import { Document } from 'mongoose';

export interface ICandidate extends Document {
    OTP?: number;
    name: string;
    mobile: string;
    email: string;
    password: string;
    expaireAt: Date;
    isBlocked?: boolean;
    isVerified?: boolean;
    profileURL?: string
}