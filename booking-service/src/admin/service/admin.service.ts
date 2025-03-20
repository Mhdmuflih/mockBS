import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IAdminService } from "../interface/IAdminService";
import { AdminRepository } from "../repository/admin.repository";
import { ISchedule } from "src/interface/interface";

@Injectable()
export class AdminService implements IAdminService {
    constructor(private readonly adminRepository: AdminRepository) { }

    async getInterview(page: number, limit: number, search?: string): Promise<{interviews:ISchedule[], totalRecords: number, totalPages: number, currentPage: number}> {
        try {
            const interviews = await this.adminRepository.getInterviews(page, limit, search);
            return {
                interviews: interviews.data,
                totalRecords: interviews.total,
                totalPages: Math.ceil(interviews.total / limit),
                currentPage:page
            };
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}