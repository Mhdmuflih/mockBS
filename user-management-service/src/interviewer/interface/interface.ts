import { Document } from "mongoose";

export interface IInterviewer extends Document {
    OTP?: number;
    name: string;
    mobile: string;
    email: string;
    password: string;
    createdAt?: Date;
    expaireAt?: Date;
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