import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { InterviewerService } from '../services/interviewer.service';
import { IInterviewerSlotController } from '../interface/IInterviewerSlotController';

@Controller('interviewer')
export class InterviewerSlotController implements IInterviewerSlotController {
  constructor(private readonly interviewerService: InterviewerService) { }

  @Post('slot')
  async addSlot(@Headers('x-user-id') interviewerId: string, @Body() formData: any): Promise<{ success: boolean; message: string; }> {
    try {
      await this.interviewerService.addSlot(interviewerId, formData);
      return { success: true, message: "slot added successfully." };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('slot')
  async getSlot(@Headers('x-user-id') interviewerId: string): Promise<any> {
    try {
      const getSlotData = await this.interviewerService.getSlot(interviewerId);
      return {success: true, message: "get Slot Data", slotData: getSlotData};
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
