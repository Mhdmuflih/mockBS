import { IInterviewerSlot } from "../../interface/interface";

export interface IInterviewerSlotRepository {
    create(interviewerId: string,formData: any): Promise<IInterviewerSlot>;
    updateScheduleData(interviewerId: string, updatedSchedule: any, date: any): Promise<IInterviewerSlot>;
    getSlot(interviewerId: string): Promise<IInterviewerSlot[]>;
}