import { Document, Types } from "mongoose";


// STACK interface
// ---------------------------------------------------------
export interface IStack extends Document {
    stackName: string;
    technologies: string[];
}


// CADNDIDATE interface
// ---------------------------------------------------------
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
    premium?: boolean;
}


// INTERVIEWER interface 
// ---------------------------------------------------------
export interface IInterviewer extends Document {
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
    profileURL?: string
}


// SLOT interface
// ---------------------------------------------------------
export interface ISchedule extends Document {
    fromTime: string;
    toTime: string;
    title: string;
    price: number;
    description: string;
    status: string;
}

export interface ISlot extends Document {
    date: Date;
    schedules: ISchedule[];
}

export interface ISlotData extends Document {
    interviewerId: Types.ObjectId;
    stack: IStack;
    slots: ISlot[]
    createdAt?: Date;
    updatedAt?: Date;
}


// SCHEDULED INTERVIEW interface
// ---------------------------------------------------------
export interface IScheduled {
    _id: Types.ObjectId;
    candidateId: Types.ObjectId;
    interviewerId: Types.ObjectId;
    scheduleId: Types.ObjectId;
    scheduledSlot: {
        stack: string;
        technology: string;
        date: string;
        from: string;
        to: string;
        title: string;
        price: number;
    };
    status: "pending"  | "completed";
    createdAt?: Date;
    updatedAt?: Date;
}


// COMMUNITY GROUPS  interface 
// ---------------------------------------------------------
export interface IGroupMember {
    candidateId: string;
    role: string;
}

export interface IGroup {
    name: string
    members: IGroupMember[]
}


// COMMUNITY MESSAGE interface
// ---------------------------------------------------------
export interface IGroupMessage {
    _id?: string;
    groupName: string;
    text: string;
    status?: string;
    timestamp?: Date;
    userId: string;
    userName: string;
  }
  