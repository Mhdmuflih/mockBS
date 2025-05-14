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

  @Post('/wallet-payment')
  async walletPaymentForBooking(@Headers('x-user-id') candidateId: string, @Body() data: PaymentData): Promise<{ success: boolean, message: string, }> {
    try {
      const paymentData = await this.candidateService.walletPaymentForBooking(candidateId, data);
      return { success: true, message: "payment for booking slot" }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/premium')
  async takeThePremium(@Headers('x-user-id') candidateId: string, @Body() body: { amount: number, duration: string }): Promise<{ success: boolean, message: string, session: Stripe.Checkout.Session }> {
    try {
      console.log(candidateId, body, 'this is body data');
      const premiumPaymentData = await this.candidateService.takeThePremium(candidateId, body);
      console.log(premiumPaymentData, ' this is data for premium');
      return { success: true, message: "candidate to take the premium Version", session: premiumPaymentData }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-premium-payment')
  async verifyPremiumPayment(@Headers('x-user-id') candidateId: string, @Body() sessionId: { sessionId: string }): Promise<{ success: boolean, message: string }> {
    try {
      await this.candidateService.verifyPremiumPayment(candidateId, sessionId.sessionId);
      return { success: true, message: "Payment status updated" };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/total-amount')
  async getCandidateTotalAmount(@Headers('x-user-id') candidateId: string): Promise<{ success: boolean, message: string, totalAmount: number }> {
    try {
      const totalAmount = await this.candidateService.getCandidateTotalAmount(candidateId);
      return { success: true, message: "candidate total payed Data", totalAmount: totalAmount }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('/cancel-interview/:id')
  async cancelInterview(@Param('id') id: string, @Headers('x-user-id') candidateId: string): Promise<{ success: boolean, message: string }> {
    try {
      console.log(id, candidateId, 'this is id');

      await this.candidateService.cancelInterview(candidateId, id);
      return { success: true, message: "interview cancel and payment added in wallet" };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/sendMoney-interview/:id')
  async snedMoneyInterviewer(@Param('id') scheduleId: string, @Headers('x-user-id') candidateId: string): Promise<{ success: boolean, message: string }> {
    try {
      console.log(scheduleId, candidateId, 'this is id');

      await this.candidateService.sendMoney(candidateId, scheduleId);
      return { success: true, message: "interview cancel and payment added in wallet" };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
