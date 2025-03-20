import { ISchedule } from "src/interface/interface";

export interface IAdminService {
    getInterview(page: number, limit: number, search?: string): Promise<{interviews:ISchedule[], totalRecords: number, totalPages: number, currentPage: number}>
}