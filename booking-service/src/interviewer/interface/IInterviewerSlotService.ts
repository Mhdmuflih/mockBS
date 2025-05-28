import { IInterviewerSlot, ISchedule } from "../../interface/interface";
import { InterviewerSlotDTO } from "../dto/interviewerSlot.dto";
import { ScheduleDTO } from "../dto/schedule.dto";

export interface IInterviewerSlotService {
    addSlot(interviewerId: string, formData: any): Promise<IInterviewerSlot>;
    getSlot(interviewerId: string, page: number, limit: number, search?: string): Promise<{ getSlotData: InterviewerSlotDTO[], totalRecords: number, totalPages: number, currentPage: number }>;
    getSheduledInterviews(interviewerId: string, page: number, limit: number, search: string): Promise<{ scheduledData: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number }>;
    cancelInterview(id: string, reason: string): Promise<ScheduleDTO>
}