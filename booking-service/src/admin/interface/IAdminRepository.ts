import { ISchedule } from "src/interface/interface";

export interface IAdminRepository {
    getInterviews(): Promise<ISchedule[]>;
}