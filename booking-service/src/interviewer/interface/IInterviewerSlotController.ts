import { IInterviewerSlot, ISchedule } from "../../interface/interface";

export interface IInterviewerSlotController {
    addSlot(interviewerId: string, formData: any): Promise<{success: boolean, message: string}>;
    getSlot(interviewerId: string): Promise<{success: boolean; message: string; slotData: IInterviewerSlot[]}>;
    getScheduledInterviews(interviewerId: string): Promise<{success: boolean; message: string; sheduledData: ISchedule[]}>;
}