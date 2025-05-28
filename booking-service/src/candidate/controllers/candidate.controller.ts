import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query, Headers, HttpException, HttpStatus, Inject, Search } from '@nestjs/common';
import { CandidateService } from '../services/candidate.service';
import { ICandidateController } from '../interface/ICandidateController';
import { ClientKafka, EventPattern, GrpcMethod, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { IInterviewerSlot, ISchedule } from 'src/interface/interface';
import { IInterviewer } from '../interface/interface';
import { ScheduleDTO } from '../dto/schedule.dto';
import { InterviewerSlotDTO } from '../dto/interivewerSlot.response.dto';


@Controller('candidate')
export class CandidateController implements ICandidateController {
  constructor(
    private readonly candidateService: CandidateService,
  ) { }

  @Get('match-interviewer/:tech')
  async getSlotMatchedInterviewer(@Param('tech') tech: string): Promise<{success:boolean; message: string; matchedData: IInterviewer[]}> {
    try {
      const matchedData: IInterviewer[] = await this.candidateService.getMatchedSlot(tech);
      return { success: true, message: "matched Slot data", matchedData: matchedData };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/interviewer-slot-details/:interviewerId')
  async getinterviewerSlotDetails(@Param('interviewerId') interviewerId: string, @Query('selectedTech') tech: string): Promise<{success: boolean; message: string; slotData: InterviewerSlotDTO, interviewerData: IInterviewer[]}> {
    try {
      const interviewerSlotData: any = await this.candidateService.getinterviewerSlotDetails(interviewerId, tech);
      console.log(interviewerSlotData, 'this is interviewerSlot data')
      return { success: true, message: "slot interviewer Data", slotData: interviewerSlotData[0], interviewerData: interviewerSlotData[1].interviewers[0] };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('scheduled-interviews')
  async scheduledInterviews(
    @Headers('x-user-id') candidateId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string
): Promise<{success: boolean; message: string; scheduledData: { scheduledInterview: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number }}> {
    try {
      const data = await this.candidateService.scheduledInterviews(candidateId, page, limit, search);
      return { success: true, message: "candidate Scheduled interviews", scheduledData: data };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

@Get('/interview-counts')
async getInterviewCounts(@Headers('x-user-id') candidateId: string): Promise<{success: boolean, message: string, counts: { scheduledInterviewCounts: number, completedInterviewCounts: number }}> {
  try {
    const counts = await this.candidateService.getInterviewCounts(candidateId);
    return {success: true, message: "interview counts", counts: counts}
  } catch (error: any) {
    console.log(error.message);
    throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


@Patch('/cancel-interview')
async cancelInterview(@Body() body: { data: { selectedId: string; cancelReason: string } }): Promise<{success:boolean; message: string, cancelData: ScheduleDTO}>{
  try {
    const  {selectedId, cancelReason} = body.data
    console.log(selectedId, cancelReason, ' this isData')
    const cancelData: ScheduleDTO = await this.candidateService.cancelInterview(selectedId, cancelReason)
    return {success: true, message: "interview cacelled successfully", cancelData: cancelData};
  } catch (error: any) {
    console.log(error.message);
    throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  // Grpc for the booking schedule data comes in payment service
  // ==============================================================

  @GrpcMethod('BookingService', 'CreateBooking')
  async getBookingData(bookingData: any): Promise<any> {
    try {
      if (!bookingData) {
        throw new RpcException({ code: status.INVALID_ARGUMENT, message: 'Invalid request data in gRPC' });
      }

      await this.candidateService.scheduleInterview(bookingData)
      return { success: true, message: "booking data saved successfully" };
    } catch (error: any) {
      if (error.message === "Already booked interview") {
        throw new RpcException({ code: status.ALREADY_EXISTS, message: error.message });
      }
      console.error('Error:', error.message);
      throw new RpcException({ code: status.INTERNAL, message: error.message || 'An error occurred' });
    }
  }

  // ===============================================================================
}
