import { ISchedule } from "src/interface/interface";

export interface IAdminController {
    getInterviews(): Promise<{ success: boolean; message: string; interviewData: ISchedule[] }>
}