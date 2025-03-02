import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { CandidateService } from '../service/candidate.service';
import { ICandidateController } from '../interface/ICandidateController';
import { EventPattern } from '@nestjs/microservices';


@Controller('candidate')
export class CandidateController implements ICandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  @Post('payment')
  async paymentForBooking(@Headers('x-user-id') candidateId: string, @Body() data: any): Promise<any> {
    try {
      const paymentData = await this.candidateService.paymentForBooking(candidateId , data);
      return {success:true, message: "payment for booking slot", session: paymentData}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-payment')
  async verifyPayment(@Body() sessionId: {sessionId: string}): Promise<any> {
    try {
      console.log(sessionId.sessionId, 'this is session id');
      const updatePayment = await this.candidateService.verifyPayment(sessionId.sessionId)
      return updatePayment;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
