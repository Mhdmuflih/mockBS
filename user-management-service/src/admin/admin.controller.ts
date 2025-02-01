import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('approval')
  getAllInterviewerApproval() {
    return this.adminService.findAllApproval();
  }

  @Get('approval-details/:id')
  getApprovalDetails(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Post('approval-details/:id')
  approveDetails(@Param('id') id: string) {
    return this.adminService.approveDetails(id);
  }

  @Get('candidates')
  getAllCandidates() {
    return this.adminService.getAllCandidate();
  }

  @Get('candidates/:id')
  getCandidateDetails(@Param('id') id: string) {
    return this.adminService.getcandidateDetails(id);
  }

  @Post('candidate-action/:id')
  candidateAction(@Param('id') id:string) {
    return this.adminService.candidateAction(id);
  }

  @Get('interviewers')
  getAllInterviewers() {
    return this.adminService.getAllInterviewers();
  }

  @Post('interviewer-action/:id')
  interviewerAction(@Param('id') id:string) {
    return this.adminService.interviewerAction(id);
  }

  @Post('add-stack')
  addStack(@Body() formData) {
    return this.adminService.addStack(formData);
  }
}
