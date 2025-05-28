import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SlotRepository } from '../repository/slot.repository';
import { sendInterviewer } from 'src/gRPC/interviewer.client';
import { ScheduleRepository } from '../repository/schedule.repositor';
import { ICandidateService } from '../interface/ICandidateService';
import { ClientKafka } from '@nestjs/microservices';
import { IInterviewerSlot, ISchedule } from 'src/interface/interface';
import { IInterviewer } from '../interface/interface';
import { ScheduleDTO } from '../dto/schedule.dto';
import { InterviewerSlotDTO } from '../dto/interivewerSlot.response.dto';

@Injectable()
export class CandidateService implements ICandidateService {
  constructor(
    private readonly slotRepository: SlotRepository,
    private readonly scheduleRepository: ScheduleRepository,
  ) { }


  // grpc data send
  // =============================
  async getMatchedSlot(tech: string): Promise<IInterviewer[]> {
    try {
      const getMatchedSlot: IInterviewerSlot[] = await this.slotRepository.getMatchSlot(tech);
      const interviewerIds: string[] = getMatchedSlot.map(slot => slot.interviewerId.toString());

      const interviewerDataResponse = await sendInterviewer(interviewerIds);

      return interviewerDataResponse;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // ====================================================

  async getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<[InterviewerSlotDTO[], IInterviewer]> {
    try {
      await this.slotRepository.updateSlotInterviewerExpire(interviewerId, tech)
      const slotData: IInterviewerSlot[] = await this.slotRepository.getSlotInterviewerDetails(interviewerId, tech);
      const interviewerDataResponse = await sendInterviewer([interviewerId]);
      console.log(interviewerDataResponse, 'this is that')

      return [InterviewerSlotDTO.fromList(slotData), interviewerDataResponse];
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async scheduleInterview(scheduleData: any): Promise<void> {
    try {
      const existingScheudledData = await this.scheduleRepository.findScheduleInterview(scheduleData.scheduledId);
      if (existingScheudledData) {
        throw new Error("already booked interview ");
      }
      await this.scheduleRepository.scheduleInterview(scheduleData.candidateId, scheduleData);
      await this.slotRepository.updateScheduleDataStatus(scheduleData);
      return;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async scheduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{ scheduledInterview: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number }> {
    try {
      const scheduledInterview = await this.scheduleRepository.findWithPagination({ candidateId }, page, limit, search);
      const scheduledData: ScheduleDTO[] = ScheduleDTO.fromList(scheduledInterview.data);
      return {
        scheduledInterview: scheduledData,
        totalRecords: scheduledInterview.total,
        totalPages: Math.ceil(scheduledInterview.total / limit),
        currentPage: page
      }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInterviewCounts(candidateId: string): Promise<{ scheduledInterviewCounts: number, completedInterviewCounts: number, cancelledInterviewCounts: number }> {
    try {
      const scheduledInterviewCounts: number = await this.scheduleRepository.getScheduledInterviewCount(candidateId);
      const completedInterviewCounts: number = await this.scheduleRepository.getCompletedInterviewCount(candidateId);
      const cancelledInterviewCounts: number = await this.scheduleRepository.getCancelledInterviewCount(candidateId);
      return { scheduledInterviewCounts: scheduledInterviewCounts, completedInterviewCounts: completedInterviewCounts, cancelledInterviewCounts: cancelledInterviewCounts }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async cancelInterview(id: string, reason: string): Promise<ScheduleDTO> {
    try {
      const cancelData: ISchedule = await this.scheduleRepository.findOneTheSchedule(id);
      if (!cancelData) {
        throw new HttpException('Scheduled interview not found', HttpStatus.NOT_FOUND);
      }
      await this.scheduleRepository.updateStatus(id, reason);
      await this.slotRepository.updateScheduleDataStatusCancelled(cancelData.scheduleId._id.toString())
      return ScheduleDTO.from(cancelData);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
