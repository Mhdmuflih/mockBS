import { IInterviewerSlot, ISchedule } from "../../interface/interface";

export interface IInterviewerSlotService {
    addSlot(interviewerId: string, formData: any): Promise<IInterviewerSlot>;
    getSlot(interviewerId: string): Promise<IInterviewerSlot[]>;
    getSheduledInterviews(interviewerId: string): Promise<ISchedule[]>;
}