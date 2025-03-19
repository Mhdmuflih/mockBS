import { Types } from "mongoose";

export interface IInterviewerSlot {
    interviewerId: Types.ObjectId;  // Ensure it matches your schema
    stack: {
        stackName: string;
        technologies: string;
    };
    slots: {
        date: Date;
        schedules: {
            fromTime: string;
            toTime: string;
            title: string;
            price: number;
            description: string;
            status: string;
        }[];
    }[];
}


export interface ISchedule {
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
    status: string;
}