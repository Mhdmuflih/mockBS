import { Controller, Get, Post, Param, Body, BadRequestException, Query } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { IAdminController } from '../interface/IAdminController';
import { InterviewerDTO } from 'src/interviewer/dto/interviewer-data.dto';
import { CandidateDTO } from 'src/candidate/dtos/candidate-data.dto';
import { StackDTO } from 'src/interviewer/dto/stack-response.dto';

@Controller('admin')
export class AdminController implements IAdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('approval')
  async getAllInterviewerApproval(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<{ success: boolean; message: string; approvalData: { approvalData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number } }> {
    try {
      const approvalData = await this.adminService.findAllApproval(page, limit, search);
      console.log(approvalData, 'this is approval data');
      return { success: true, message: "interviewer Data.", approvalData: approvalData };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('approval-details/:id')
  async getApprovalDetails(@Param('id') id: string): Promise<{ success: boolean; message: string; approvalData: InterviewerDTO }> {
    try {
      console.log(id, 'this is id');
      const getApprovalDetails = await this.adminService.findOne(id);
      console.log(getApprovalDetails, 'this is approval details');
      return { success: true, message: "interviewerDetails", approvalData: getApprovalDetails };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('approval-details/:id')
  async approveDetails(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.adminService.approveDetails(id);
      return { success: true, message: "interviewerDetails" };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('candidates')
  async getAllCandidates(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ): Promise<{ success: boolean; message: string; candidateData: { candidatesData: CandidateDTO[]; totalRecords: number, totalPages: number, currentPage: number } }> {
    try {
      const candidatesData = await this.adminService.getAllCandidate(page, limit, search);
      return { success: true, message: "interviewerDetails", candidateData: candidatesData };

    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('candidates/:id')
  async getCandidateDetails(@Param('id') id: string): Promise<{ success: boolean; message: string; candidateData: CandidateDTO }> {
    try {
      const candidateDetails: CandidateDTO = await this.adminService.getcandidateDetails(id);
      return { success: true, message: "interviewerDetails", candidateData: candidateDetails };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('candidate-action/:id')
  async candidateAction(@Param('id') id: string): Promise<{ success: boolean; message: string; candidateData: CandidateDTO }> {
    try {
      const updatedCandidate: CandidateDTO = await this.adminService.candidateAction(id);
      return { success: true, message: "Candidate status updated successfully!", candidateData: updatedCandidate };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('interviewers')
  async getAllInterviewers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<{ success: boolean; message: string; interviewerData: { interviewersData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number } }> {
    try {
      const interviewersData = await this.adminService.getAllInterviewers(page, limit, search);
      return { success: true, message: "interviewerDetails", interviewerData: interviewersData };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('interviewer-action/:id')
  async interviewerAction(@Param('id') id: string): Promise<{ success: boolean; message: string; interviewerData: InterviewerDTO }> {
    try {
      const updatedInterviewer: InterviewerDTO = await this.adminService.interviewerAction(id);
      return { success: true, message: "Interviewer status updated successfully!", interviewerData: updatedInterviewer };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('add-stack')
  async addStack(@Body() formData): Promise<{ success: boolean; message: string; stackData: StackDTO }> {
    try {
      const saveStack: StackDTO = await this.adminService.addStack(formData);
      return { success: true, message: 'Stack added successfully!', stackData: saveStack };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('stack-list')
  async stackList(): Promise<{ success: boolean; message: string; stackData: StackDTO[] }> {
    try {
      const stack: StackDTO[] = await this.adminService.getAllStack();
      return { success: true, message: "stack Data", stackData: stack };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('interview-details')
  async getInterviewDetails(@Query() ids: { candidateId: string; interviewerId: string }): Promise<{ success: boolean; message: string; interviewDetailsData: any }> {
    try {
      // console.log(ids, 'this is ids of interviews');
      const interviewDetailsData = await this.adminService.getInterviewsDetailsData(ids)
      // console.log(interviewDetailsData, 'this is interview data');
      return { success: true, message: "interview Details data", interviewDetailsData: interviewDetailsData }
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('/dashboard')
  async getDashboard(): Promise<{ success: boolean, message: string, candidate: number, premiumCandidates: number, interviewer: number, unApprovedInterviewer: number }> {
    try {
      const dashboardData = await this.adminService.getDashboradData();
      console.log(dashboardData, 'this is dashboard data');
      return { success: true, message: "dashboard Data", candidate: dashboardData.candidate, premiumCandidates: dashboardData.premiumCandidates, interviewer: dashboardData.interviewer, unApprovedInterviewer: dashboardData.unApprovedInterviewer }
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

}
