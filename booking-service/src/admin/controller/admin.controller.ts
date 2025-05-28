import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { IAdminController } from "../interface/IAdminController";
import { AdminService } from "../service/admin.service";
import { ScheduleDTO } from "src/interviewer/dto/schedule.dto";

@Controller('admin')
export class AdminController implements IAdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('interviews')
  async getInterviews(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<{ success: boolean; message: string; interviewData: { interviews: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number } }> {
    try {
      const interviewData = await this.adminService.getInterview(page, limit, search);
      return { success: true, message: "interview's Data", interviewData: interviewData }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/dashboard')
  async getDashboard(): Promise<{ success: boolean, message: string, interview: number, completedInterview: number }> {
    try {
      const dashboardData = await this.adminService.getDashboradData();
      return { success: true, message: "admin dashboard", interview: dashboardData.interview, completedInterview: dashboardData.completedInterview }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}