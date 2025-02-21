import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { IAdminController } from "../interface/IAdminController";
import { AdminService } from "../service/admin.service";

@Controller('admin')
export class AdminController implements IAdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('interviews')
    async getInterviews(): Promise<any> {
        try {
            const interviewData = await this.adminService.getInterview();
            console.log(interviewData, 'this is for interviewData');
            return { success: true, message: "interview's Data", interviewData: interviewData }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}