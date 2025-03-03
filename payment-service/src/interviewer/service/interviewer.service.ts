import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInterviewerDto } from '../dto/create-interviewer.dto';
import { UpdateInterviewerDto } from '../dto/update-interviewer.dto';
import { InterviewerRepository } from '../repository/interviewer.repository';

@Injectable()
export class InterviewerService {
  constructor(private readonly interviewerRepository: InterviewerRepository) { }

  async getPaymentData(interviewerId: string): Promise<any> {
    try {
      const payment = await this.interviewerRepository.getPaymentHistoryData(interviewerId);
      return payment;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
