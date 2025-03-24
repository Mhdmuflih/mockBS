import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { CandidateService } from '../service/candidate.service';
import { ICandidateController } from '../interface/ICandidateController';
import { EventPattern } from '@nestjs/microservices';
import { IPayment } from '../interface/Interface';
import Stripe from 'stripe';


@Controller('candidate')
export class CandidateController implements ICandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  @Post('payment')
  async paymentForBooking(@Headers('x-user-id') candidateId: string, @Body() data: any): Promise<{success :boolean, message: string, session: Stripe.Checkout.Session}> {
    try {
      // console.log(data, 'this is the data')
      const paymentData = await this.candidateService.paymentForBooking(candidateId , data);
      return {success:true, message: "payment for booking slot", session: paymentData}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-payment')
  async verifyPayment(@Body() sessionId: {sessionId: string}): Promise<IPayment> {
    try {
      // console.log(sessionId.sessionId, 'this is session id');
      const updatePayment = await this.candidateService.verifyPayment(sessionId.sessionId)
      return updatePayment;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
