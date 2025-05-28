import { IInterviewerSlot, ISchedule } from "../../interface/interface";
import { InterviewerSlotDTO } from "../dto/interviewerSlot.dto";
import { ScheduleDTO } from "../dto/schedule.dto";

export interface IInterviewerSlotController {
    addSlot(interviewerId: string, formData: any): Promise<{ success: boolean, message: string }>;
    getSlot(interviewerId: string, page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; slotData: { getSlotData: InterviewerSlotDTO[], totalRecords: number, totalPages: number, currentPage: number } }>;
    getScheduledInterviews(interviewerId: string, page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; sheduledData: { scheduledData: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number } }>;
}