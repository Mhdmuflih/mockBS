import { ScheduleDTO } from "src/interviewer/dto/schedule.dto";

export interface IAdminService {
    getInterview(page: number, limit: number, search?: string): Promise<{ interviews: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number }>
    getDashboradData(): Promise<{ interview: number, completedInterview: number }>;
}