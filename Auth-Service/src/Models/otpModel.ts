import { model, Schema } from "mongoose";

export interface IOtp {
    otp: number;
    email: string;
    createdAt: Date;
    expaireAt: Date;
}

const otpSchema: Schema = new Schema({
    otp: { // Fixed field name (lowercase)
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: { // Fixed field name (lowercase)
        type: Date,
        default: Date.now,
    },
    expaireAt: { // Fixed field name (lowercase)
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000), // 2 minutes expiration
    },
});

export default model<IOtp>("Otp", otpSchema);
