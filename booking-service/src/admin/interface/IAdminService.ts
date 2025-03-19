import { ISchedule } from "src/interface/interface";

export interface IAdminService {
    getInterview(): Promise<ISchedule[]>
}