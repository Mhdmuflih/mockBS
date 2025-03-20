import { IInterviewerSlot, ISchedule } from "../../interface/interface";

export interface IInterviewerSlotService {
    addSlot(interviewerId: string, formData: any): Promise<IInterviewerSlot>;
    getSlot(interviewerId: string, page: number, limit: number, search?: string): Promise<{getSlotData: IInterviewerSlot[], totalRecords: number, totalPages:number, currentPage: number}>;
    getSheduledInterviews(interviewerId: string, page: number, limit: number, search: string): Promise<{scheduledData:ISchedule[], totalRecords: number, totalPages: number, currentPage: number}>;
}