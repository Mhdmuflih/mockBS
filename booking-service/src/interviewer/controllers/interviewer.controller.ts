import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Headers, HttpException, HttpStatus, Query } from '@nestjs/common';
import { InterviewerService } from '../services/interviewer.service';
import { IInterviewerSlotController } from '../interface/IInterviewerSlotController';
import { IInterviewerSlot, ISchedule } from '../../interface/interface';
import { InterviewerSlotDTO } from '../dto/interviewerSlot.dto';
import { ScheduleDTO } from '../dto/schedule.dto';

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
  async getSlot(
    @Headers('x-user-id') interviewerId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<{ success: boolean; message: string; slotData: { getSlotData: InterviewerSlotDTO[], totalRecords: number, totalPages: number, currentPage: number } }> {
    try {
      const getSlotData = await this.interviewerService.getSlot(interviewerId, page, limit, search);
      return { success: true, message: "get Slot Data", slotData: getSlotData };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('scheduled-interviews')
  async getScheduledInterviews(
    @Headers('x-user-id') interviewerId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
  ): Promise<{ success: boolean; message: string; sheduledData: { scheduledData: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number } }> {
    try {
      const data = await this.interviewerService.getSheduledInterviews(interviewerId, page, limit, search);
      return { success: true, message: "interviewer scheduled interivews", sheduledData: data };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @Patch('/cancel-interview')
  async cancelInterview(@Body() body: { data: { selectedId: string; cancelReason: string } }): Promise<{ success: boolean; message: string, cancelData: ScheduleDTO }> {
    try {
      const { selectedId, cancelReason } = body.data
      const cancelData = await this.interviewerService.cancelInterview(selectedId, cancelReason)
      return { success: true, message: "interview cacelled successfully", cancelData: cancelData };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
