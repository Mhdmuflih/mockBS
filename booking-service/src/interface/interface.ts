import { Document, Types } from "mongoose";

export interface IInterviewerSlot extends Document {
    interviewerId: Types.ObjectId;  // Ensure it matches your schema
    stack: {
        stackName: string;
        technologies: string;
    };
    slots: {
        _id?: string
        date: Date;
        schedules: {
            _id?:string;
            fromTime: string;
            toTime: string;
            title: string;
            price: number;
            description: string;
            status: string;
        }[];
    }[];
}


export interface ISchedule extends Document{
    candidateId: Types.ObjectId;
    interviewerId: Types.ObjectId;
    scheduleId: Types.ObjectId;
    scheduledSlot: {
        _id?:string;
        stack: string;
        technology: string;
        date: string;
        from: string;
        to: string;
        title: string;
        price: number;
    };
    status: string;
    cancelReason?: string;
}