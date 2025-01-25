import { Document, model, Schema } from "mongoose";



export interface ICandidate extends Document {
    OTP?: number;
    name: string;
    mobile: string;
    email: string;
    password: string;
    expaireAt: Date;
    isBlocked?: boolean;
    isVerified?: boolean;
}



const candidateSchema: Schema = new Schema({
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
        default:""
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    OTP: {
        type: Number,
    },
    expaireAt: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000) // 2 minutes expiration
    }
}, { timestamps: true });


export default candidateSchema;

// Optionally, export the model for manual use elsewhere
export const InterviewerModel = model<ICandidate>("Candidate", candidateSchema);