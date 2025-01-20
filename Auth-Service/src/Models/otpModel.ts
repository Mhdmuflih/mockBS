import { model, Schema } from "mongoose";


export interface IOtp {
    otp: number;
    name: string;
    mobile: string;
    email: string;
    password: string;
    createdAt: Date;
    expaireAt: Date;
}


const otpSchema: Schema = new Schema({
    otp: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expaireAt: {
        type: Date,
        default: Date.now() + 600000
    }
});

export default model<IOtp>("Otp", otpSchema);