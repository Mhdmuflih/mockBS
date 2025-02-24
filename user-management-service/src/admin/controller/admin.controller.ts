import { Controller, Get, Post, Param, Body, BadRequestException, Query } from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { IAdminController } from '../interface/IAdminController';

@Controller('admin')
export class AdminController implements IAdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('approval')
  async getAllInterviewerApproval(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<any> {
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
      // console.log(approvalData, 'this is approval data for the pagination ')
      return { success: true, message: "interviewer Data.", approvalData: approvalData };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('approval-details/:id')
  async getApprovalDetails(@Param('id') id: string): Promise<any> {
    try {
      const getApprovalDetails = await this.adminService.findOne(id);
      return { success: true, message: "interviewerDetails", approvalData: getApprovalDetails };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('approval-details/:id')
  async approveDetails(@Param('id') id: string): Promise<any> {
    try {
      await this.adminService.approveDetails(id);
      return { success: true, message: "interviewerDetails" };

    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('candidates')
  async getAllCandidates(): Promise<any> {
    try {
      const candidatesData = await this.adminService.getAllCandidate();
      return { success: true, message: "interviewerDetails", candidateData: candidatesData };

    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('candidates/:id')
  async getCandidateDetails(@Param('id') id: string): Promise<any> {
    try {
      const candidateDetails = await this.adminService.getcandidateDetails(id);
      return { success: true, message: "interviewerDetails", candidateData: candidateDetails };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('candidate-action/:id')
  async candidateAction(@Param('id') id: string): Promise<any> {
    try {
      const updatedCandidate = await this.adminService.candidateAction(id);
      return { success: true, message: "Candidate status updated successfully!", candidateData: updatedCandidate };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('interviewers')
  async getAllInterviewers(): Promise<any> {
    try {
      const interviewersData = await this.adminService.getAllInterviewers();
      return { success: true, message: "interviewerDetails", interviewerData: interviewersData };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('interviewer-action/:id')
  async interviewerAction(@Param('id') id: string): Promise<any> {
    try {
      const updatedInterviewer = await this.adminService.interviewerAction(id);
      return { success: true, message: "Interviewer status updated successfully!", interviewerData: updatedInterviewer };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('add-stack')
  async addStack(@Body() formData): Promise<any> {
    try {
      const saveStack = await this.adminService.addStack(formData);
      return { success: true, message: 'Stack added successfully!', stackData: saveStack };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('stack-list')
  async stackList(): Promise<any> {
    try {
      const stack = await this.adminService.getAllStack();
      return { success: true, message: "stack Data", stackData: stack };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

}
