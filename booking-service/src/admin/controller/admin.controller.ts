import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { IAdminController } from "../interface/IAdminController";
import { AdminService } from "../service/admin.service";
import { ISchedule } from "src/interface/interface";

@Controller('admin')
export class AdminController implements IAdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('interviews')
    async getInterviews(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('search') search?: string
    ): Promise<{ success: boolean; message: string; interviewData: {interviews:ISchedule[], totalRecords: number, totalPages: number, currentPage: number} }> {
        try {
            const interviewData = await this.adminService.getInterview(page, limit, search);
            return { success: true, message: "interview's Data", interviewData: interviewData }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/dashboard')
  async getDashboard(): Promise<{interview: number}> {
    try {
      const dashboardData = await this.adminService.getDashboradData();
      return dashboardData
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}