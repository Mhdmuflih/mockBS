import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { IAdminController } from '../interface/IAdminController';
import { IPayment } from 'src/candidate/interface/Interface';

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

  @Post('/pay-to-interviewer')
  async payToInterviewer(@Body() body: { id: string }) {
    try {
      await this.adminService.payToInterviewer(body.id);
      return { success: true, message: "Payment successful completed!" };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/dashboard')
  async getDashboard(): Promise<{paymentProfit: number}> {
    try {
      const dashboardData = await this.adminService.getDashboradData();
      console.log(dashboardData, 'this is dashboard data');
      return dashboardData
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
