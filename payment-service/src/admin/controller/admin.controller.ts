import { Controller, Get, HttpStatus, HttpException, Query } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { IAdminController } from '../interface/IAdminController';

@Controller('admin')
export class AdminController implements IAdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('/payment-details')
  async interviewerPaymentDetails(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<{success: boolean, message: string, interviewerPaymentData: {interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number}}> {
    try {
      console.log(page, limit, search, 'ith okke ivide eathinee backi next')
      const interviewerPaymentData = await this.adminService.interviewerPayment(page, limit, search);
      console.log(interviewerPaymentData, 'ith payemnt admin nnte ann');
      return { success: true, message: "interviewer payment details", interviewerPaymentData: interviewerPaymentData }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('premium-payment-details')
  async premiumPaymentDetails():Promise<{success: boolean, message: string, premiumData: any}> {
    try {
      const premiumData = await this.adminService.getPremiumPaymentData();
      return {success: true, message: "premium payment data", premiumData: premiumData}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/dashboard')
  async getDashboard(): Promise<{success: boolean, message: string, revenue: number, profit: number, profitPremium: number}> {
    try {
      const dashboardData = await this.adminService.getDashboradData();
      console.log(dashboardData, 'this is dashboard data');
      return {success: true, message: 'admin dashboard', revenue: dashboardData.revenue, profit: dashboardData.profit, profitPremium: dashboardData.profitPremium}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
