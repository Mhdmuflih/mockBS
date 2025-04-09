import { ISchedule } from "src/interface/interface";

export interface IAdminRepository {
    // getInterviews(page: number, limit: number, search?: string): Promise<{total: number, data:ISchedule[]}>;
    findInterviewCount(): Promise<number>;
    findCompletedInterviewCount(): Promise<number>
}