import { ISchedule } from "src/interface/interface";
import { ScheduleDTO } from "src/interviewer/dto/schedule.dto";

export interface IAdminController {
    getInterviews(page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; interviewData: {interviews:ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number} }>
    getDashboard(): Promise<{success: boolean, message: string, interview: number, completedInterview: number}>;
}