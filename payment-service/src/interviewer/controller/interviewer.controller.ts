import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpStatus, HttpException } from '@nestjs/common';
import { IInterviewerController } from '../interface/IInterviewerController';
import { InterviewerService } from '../service/interviewer.service';
import { IPayment, IWallet } from '../interface/interface';
// import { InterviewerService } from './interviewer.service';
// import { CreateInterviewerDto } from './dto/create-interviewer.dto';
// import { UpdateInterviewerDto } from './dto/update-interviewer.dto';

@Controller('interviewer')
export class InterviewerController implements IInterviewerController {
  constructor( private readonly interviewerService: InterviewerService ) { }

  @Get("payment")
  async getInterviewerPaymentHistory(@Headers('x-user-id') interviewerId: string): Promise<{success: boolean, message: string, paymentData: IWallet}> {
    try {
      const paymentData = await this.interviewerService.walletData(interviewerId);
      return {success: true, message: "payement history of the interviewer", paymentData: paymentData}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Post("wallet-withdraw")
  async walletWithdraw(@Headers('x-user-id') interviewerId: string, @Body() body: {amount: number}): Promise<{success: boolean , message: string, walletData: IWallet}> {
    try {
      const walletData = await this.interviewerService.walletWithdraw(interviewerId, body.amount);
      return {success: true, message: "payement history of the interviewer", walletData: walletData}
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
