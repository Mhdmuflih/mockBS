import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpStatus, HttpException } from '@nestjs/common';
import { IInterviewerController } from '../interface/IInterviewerController';
import { InterviewerService } from '../service/interviewer.service';
// import { InterviewerService } from './interviewer.service';
// import { CreateInterviewerDto } from './dto/create-interviewer.dto';
// import { UpdateInterviewerDto } from './dto/update-interviewer.dto';

@Controller('interviewer')
export class InterviewerController implements IInterviewerController {
  constructor( private readonly interviewerService: InterviewerService ) { }

  @Get("payment")
  async getInterviewerPaymentHistory(@Headers('x-user-id') interviewerId: string): Promise<any> {
    try {
      const paymentData = await this.interviewerService.getPaymentData(interviewerId);
      console.log(paymentData, 'paymentdata')
      return {success: true, message: "payement history of the interviewer", paymentData: paymentData}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
