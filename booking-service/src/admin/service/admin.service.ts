import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IAdminService } from "../interface/IAdminService";
import { AdminRepository } from "../repository/admin.repository";
import { ISchedule } from "src/interface/interface";
import { ScheduleDTO } from "src/interviewer/dto/schedule.dto";

@Injectable()
export class AdminService implements IAdminService {
    constructor(private readonly adminRepository: AdminRepository) { }

    async getInterview(page: number, limit: number, search?: string): Promise<{ interviews: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number }> {
        try {
            const interviews = await this.adminRepository.findWithPagination({}, page, limit, search);
            const interviewData: ScheduleDTO[] = ScheduleDTO.fromList(interviews.data);
            return {
                interviews: interviewData,
                totalRecords: interviews.total,
                totalPages: Math.ceil(interviews.total / limit),
                currentPage: page
            };
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDashboradData(): Promise<{ interview: number, completedInterview: number }> {
        try {
            const interview: number = await this.adminRepository.findInterviewCount();
            const completedInterviewCount: number = await this.adminRepository.findCompletedInterviewCount()
            console.log(interview, 'this is interview count');
            return { interview: interview, completedInterview: completedInterviewCount };
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}