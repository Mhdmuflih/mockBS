import { ISchedule } from "src/interface/interface";

export interface IAdminRepository {
    findInterviewCount(): Promise<number>;
    findCompletedInterviewCount(): Promise<number>
}