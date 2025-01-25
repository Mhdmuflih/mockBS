import { Controller, Get, Post, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get all interview approvals
  @Get('approval')
  getAllInterviewerApproval() {
    return this.adminService.findAllApproval();
  }

  // Get approval details by ID
  @Get('approval-details/:id')
  getApprovalDetails(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  // Approve details for a specific ID
  @Post('approval-details/:id')
  approveDetails(@Param('id') id: string) {
    return this.adminService.approveDetails(id);
  }

  // Get all candidates
  @Get('candidates')
  getAllCandidates() {
    return this.adminService.getAllCandidate();
  }

  // Get details of a specific candidate by ID
  @Get('candidates/:id') // Changed from POST to GET as it's fetching data
  getCandidateDetails(@Param('id') id: string) {
    return this.adminService.getcandidateDetails(id);
  }
}
