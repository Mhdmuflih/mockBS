import { IInterviewerSlot, ISchedule } from "../../interface/interface";

export interface IInterviewerSlotController {
    addSlot(interviewerId: string, formData: any): Promise<{ success: boolean, message: string }>;
    getSlot(interviewerId: string, page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; slotData: { getSlotData: IInterviewerSlot[], totalRecords: number, totalPages: number, currentPage: number } }>;
    getScheduledInterviews(interviewerId: string,page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; sheduledData: {scheduledData:ISchedule[], totalRecords: number, totalPages: number, currentPage: number} }>;
}