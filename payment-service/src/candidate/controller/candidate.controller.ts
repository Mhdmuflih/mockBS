import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { CandidateService } from '../service/candidate.service';
import { ICandidateController } from '../interface/ICandidateController';
import Stripe from 'stripe';
import { PaymentData } from '../interface/Interface';


@Controller('candidate')
export class CandidateController implements ICandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  @Post('payment')
  async paymentForBooking(@Headers('x-user-id') candidateId: string, @Body() data: PaymentData): Promise<{ success: boolean, message: string, session: Stripe.Checkout.Session }> {
    try {
      const paymentData = await this.candidateService.paymentForBooking(candidateId, data);
      return { success: true, message: "payment for booking slot", session: paymentData }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-payment')
  async verifyPayment(@Body() sessionId: { sessionId: string }): Promise<{ success: boolean, message: string }> {
    try {
      await this.candidateService.verifyPayment(sessionId.sessionId);
      return { success: true, message: "Payment status updated" };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
