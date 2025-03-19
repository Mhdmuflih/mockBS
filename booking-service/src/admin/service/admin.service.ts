import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IAdminService } from "../interface/IAdminService";
import { AdminRepository } from "../repository/admin.repository";
import { ISchedule } from "src/interface/interface";

@Injectable()
export class AdminService implements IAdminService {
    constructor(private readonly adminRepository: AdminRepository) { }

    async getInterview(): Promise<ISchedule[]> {
        try {
            const interviews = await this.adminRepository.getInterviews();
            return interviews;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}