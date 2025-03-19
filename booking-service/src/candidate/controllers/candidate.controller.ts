import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query, Headers, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CandidateService } from '../services/candidate.service';
import { ICandidateController } from '../interface/ICandidateController';
import { ClientKafka, EventPattern, GrpcMethod, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { IInterviewerSlot, ISchedule } from 'src/interface/interface';


@Controller('candidate')
export class CandidateController implements ICandidateController {
  constructor(
    private readonly candidateService: CandidateService,
  ) { }

  @Get('match-interviewer/:tech')
  async getSlotMatchedInterviewer(@Param('tech') tech: string): Promise<{success:boolean; message: string; matchedData: any}> {
    try {
      const matchedData = await this.candidateService.getMatchedSlot(tech);
      return { success: true, message: "matched Slot data", matchedData: matchedData };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/interviewer-slot-details/:interviewerId')
  async getinterviewerSlotDetails(@Param('interviewerId') interviewerId: string, @Query('selectedTech') tech: string): Promise<{success: boolean; message: string; slotData: IInterviewerSlot, interviewerData: any}> {
    try {
      const interviewerSlotData: any = await this.candidateService.getinterviewerSlotDetails(interviewerId, tech);
      return { success: true, message: "slot interviewer Data", slotData: interviewerSlotData[0], interviewerData: interviewerSlotData[1].interviewers[0] };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('scheduled-interviews')
  async scheduledInterviews(@Headers('x-user-id') candidateId: string): Promise<{success: boolean; message: string; scheduledData: ISchedule[]}> {
    try {
      const data = await this.candidateService.scheduledInterviews(candidateId);
      console.log(data, 'this is schedule data');
      return { success: true, message: "candidate Scheduled interviews", scheduledData: data };
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
