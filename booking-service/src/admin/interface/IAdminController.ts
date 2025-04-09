import { ISchedule } from "src/interface/interface";

export interface IAdminController {
    getInterviews(page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; interviewData: {interviews:ISchedule[], totalRecords: number, totalPages: number, currentPage: number} }>
    getDashboard(): Promise<{success: boolean, message: string, interview: number, completedInterview: number}>;
}