import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query, Headers } from '@nestjs/common';
import { CandidateService } from '../services/candidate.service';
import { ICandidateController } from '../interface/ICandidateController';


@Controller('candidate')
export class CandidateController implements ICandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  @Get('match-interviewer/:tech')
  async getSlotMatchedInterviewer(@Param('tech') tech: string): Promise<any> {
    try {
      const matchedData = await this.candidateService.getMatchedSlot(tech);
      return { success: true, message: "matched Slot data", matchedData: matchedData };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Get('/interviewer-slot-details/:interviewerId')
  async getinterviewerSlotDetails(@Param('interviewerId') interviewerId: string, @Query('selectedTech') tech: string): Promise<any> {
    try {
      const interviewerSlotData: any = await this.candidateService.getinterviewerSlotDetails(interviewerId, tech);
      // console.log(interviewerSlotData,' thjis is slot interviewerData');
      // console.log(interviewerSlotData[1].interviewers[0], 'this is slot interviewerData');

      // console.log(interviewerSlotData[0],' thjis is interviewer');
      return { success: true, message: "slot interviewer Data", slotData: interviewerSlotData[0] , interviewerData: interviewerSlotData[1].interviewers[0] };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Post('schedule')
  async scheduleInterview(@Headers('x-user-id') candidateId: string, @Body() scheduleData:any  ): Promise<any> {
    try {
      if (!candidateId || !scheduleData) {
        throw new BadRequestException('Candidate ID and Slot ID are required');
      }
      await this.candidateService.scheduleInterview(candidateId, scheduleData);
      return { success: true, message: "Booking successful!" };
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }
}
