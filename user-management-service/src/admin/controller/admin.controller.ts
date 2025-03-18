import { Controller, Get, Post, Param, Body, BadRequestException, Query } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { IAdminController } from '../interface/IAdminController';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { ICandidate, IStack } from 'src/candidate/interface/interface';

@Controller('admin')
export class AdminController implements IAdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('approval')
  async getAllInterviewerApproval(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<{ success: boolean; message: string; approvalData: IInterviewer }> {
    try {

      // if (search) {
      //   const approvalData = await this.adminService.findAllApproval(0, 0, search);
      //   return {
      //     success: true,
      //     message: "Search Results",
      //     approvalData,
      //     totalRecords: approvalData.length,
      //     searchMode: true,
      //   };
      // }
      // const approvalData = await this.adminService.findAllApproval(page, limit, search);
      // return {
      //   success: true,
      //   message: "Interviewer Data",
      //   approvalData: approvalData,
      // };
      // console.log(search, page, limit, 'this is forntend to send in backend')
      const approvalData = await this.adminService.findAllApproval(page, limit, search);
      console.log(approvalData, 'this is approval data for the pagination ');
      return { success: true, message: "interviewer Data.", approvalData: approvalData };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('approval-details/:id')
  async getApprovalDetails(@Param('id') id: string): Promise<{ success: boolean; message: string; approvalData: IInterviewer }> {
    try {
      const getApprovalDetails = await this.adminService.findOne(id);
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
  async getAllCandidates(): Promise<{ success: boolean; message: string; candidateData: ICandidate[] }> {
    try {
      const candidatesData = await this.adminService.getAllCandidate();
      return { success: true, message: "interviewerDetails", candidateData: candidatesData };

    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('candidates/:id')
  async getCandidateDetails(@Param('id') id: string): Promise<{ success: boolean; message: string; candidateData: ICandidate }> {
    try {
      const candidateDetails = await this.adminService.getcandidateDetails(id);
      return { success: true, message: "interviewerDetails", candidateData: candidateDetails };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('candidate-action/:id')
  async candidateAction(@Param('id') id: string): Promise<{ success: boolean; message: string; candidateData: ICandidate }> {
    try {
      const updatedCandidate = await this.adminService.candidateAction(id);
      return { success: true, message: "Candidate status updated successfully!", candidateData: updatedCandidate };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('interviewers')
  async getAllInterviewers(): Promise<{ success: boolean; message: string; interviewerData: IInterviewer[] }> {
    try {
      const interviewersData = await this.adminService.getAllInterviewers();
      return { success: true, message: "interviewerDetails", interviewerData: interviewersData };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('interviewer-action/:id')
  async interviewerAction(@Param('id') id: string): Promise<{ success: boolean; message: string; interviewerData: IInterviewer }> {
    try {
      const updatedInterviewer = await this.adminService.interviewerAction(id);
      return { success: true, message: "Interviewer status updated successfully!", interviewerData: updatedInterviewer };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('add-stack')
  async addStack(@Body() formData): Promise<{ success: boolean; message: string; stackData: IStack }> {
    try {
      const saveStack = await this.adminService.addStack(formData);
      return { success: true, message: 'Stack added successfully!', stackData: saveStack };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('stack-list')
  async stackList(): Promise<{ success: boolean; message: string; stackData: IStack[] }> {
    try {
      const stack = await this.adminService.getAllStack();
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

}
