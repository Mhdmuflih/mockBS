import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SlotRepository } from '../repository/slot.repository';
import { sendInterviewer } from 'src/gRPC/interviewer.client';
import { ScheduleRepository } from '../repository/schedule.repositor';
import { ICandidateService } from '../interface/ICandidateService';
import { ClientKafka } from '@nestjs/microservices';
import { ISchedule } from 'src/interface/interface';
import { IInterviewer } from '../interface/interface';

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
      const getMatchedSlot = await this.slotRepository.getMatchSlot(tech);
      const interviewerIds = getMatchedSlot.map(slot => slot.interviewerId.toString());

      const interviewerDataResponse = await sendInterviewer(interviewerIds);

      return interviewerDataResponse;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // ====================================================

  async getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<any> {
    try {
      await this.slotRepository.updateSlotInterviewerExpire(interviewerId, tech)
      const slotData = await this.slotRepository.getSlotInterviewerDetails(interviewerId, tech);
      const interviewerDataResponse = await sendInterviewer([interviewerId]);

      return [slotData, interviewerDataResponse];
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async scheduleInterview(scheduleData: any): Promise<void> {
    try {
      // const existingScheudledData = await this.scheduleRepository.findOne(scheduleData.scheduleId);
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

  async scheduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{ scheduledInterview: ISchedule[], totalRecords: number, totalPages: number, currentPage: number }> {
    try {
      const scheduledInterview = await this.scheduleRepository.findWithPagination({candidateId}, page, limit, search);
      // const scheduledInterview = await this.scheduleRepository.candidateSceduledInterviews(candidateId, page, limit, search);
      return {
        scheduledInterview: scheduledInterview.data,
        totalRecords: scheduledInterview.total,
        totalPages: Math.ceil(scheduledInterview.total / limit),
        currentPage: page
      }
    } catch(error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInterviewCounts(candidateId: string): Promise<{scheduledInterviewCounts: number, completedInterviewCounts: number}> {
    try {
      const scheduledInterviewCounts = await this.scheduleRepository.getScheduledInterviewCount(candidateId);
      const completedInterviewCounts = await this.scheduleRepository.getCompletedInterviewCount(candidateId);
      return {scheduledInterviewCounts: scheduledInterviewCounts, completedInterviewCounts: completedInterviewCounts}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
