import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SlotRepository } from '../repository/slot.repository';
import { sendInterviewer } from 'src/gRPC/interviewer.client';
import { ScheduleRepository } from '../repository/schedule.repositor';
import { ICandidateService } from '../interface/ICandidateService';

@Injectable()
export class CandidateService implements ICandidateService {
  constructor(
    private readonly slotRepository: SlotRepository,
    private readonly schedulRepository: ScheduleRepository
  ) { }

  // grpc data send
  async getMatchedSlot(tech: string): Promise<any> {
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

  async getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<any> {
    try {
      const slotData = await this.slotRepository.getSlotInterviewerDetails(interviewerId, tech);
      const interviewerDataResponse = await sendInterviewer([interviewerId]);

      return [slotData, interviewerDataResponse];
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async scheduleInterview(candidateId: string, scheduleData: any): Promise<void> {
    try {
      await this.schedulRepository.scheduleInterview(candidateId, scheduleData);
      await this.slotRepository.updateScheduleDataStatus(scheduleData);
      return;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
