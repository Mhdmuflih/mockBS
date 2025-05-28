import { Document, model, Schema, Types } from "mongoose";



export interface IInterviewer extends Document {
    _id: Types.ObjectId;
    OTP?: number;
    name: string;
    mobile: string;
    email: string;
    password: string;
    createdAt: Date;
    expaireAt: Date;
    isBlocked?: boolean;
    isVerified?: boolean;
    isApproved?: boolean;
    isDetails?: boolean;
    currentDesignation?: string;
    yearOfExperience?: number;
    university?: string;
    organization?: string;
    introduction?: string;
    profileURL?: string;
    resumeURL?: string;
    salarySlipURL?: string;
}




const interviewerSchema: Schema = new Schema({
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
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    OTP:{
        type:Number,
    },
    createdAT:{
        type:Date,
        default:Date.now
    },
    expaireAt:{
        type:Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000) // 2 minutes expiration
    },
    isBlocked: {
        type: Boolean,
        default: false,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isDetails: {
        type: Boolean,
        default: false
    },
    currentDesignation: {
        type: String
    },
    yearOfExperience: {
        type: Number
    },
    university: {
        type: String
    },
    organization: {
        type: String
    },
    introduction: {
        type: String
    },
    profileURL: {
        type: String
    },
    resumeURL: {
        type: String
    },
    salarySlipURL: {
        type: String
    }
})

export default model<IInterviewer>("Interviewer", interviewerSchema);