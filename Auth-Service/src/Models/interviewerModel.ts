import { Document, model, Schema } from "mongoose";



export interface IInterviewer extends Document {
    name: string;
    mobile: string;
    email: string;
    password: string;
    isBlocked?: boolean;
    isVerified?: boolean;
    isDetails?: boolean;
    currentDesignation?: string;
    yearOfExperience?: number;
    university?: string;
    organization?: string;
    introduction?: string;
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
    isBlocked: {
        type: Boolean,
        default: false,
        required: true
    },
    isVerified: {
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