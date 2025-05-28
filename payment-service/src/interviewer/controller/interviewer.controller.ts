import { Controller, Get, Post, Body, Headers, HttpStatus, HttpException } from '@nestjs/common';
import { IInterviewerController } from '../interface/IInterviewerController';
import { InterviewerService } from '../service/interviewer.service';
import { WalletDTO } from '../dto/interviewer.wallet.dto';

@Controller('interviewer')
export class InterviewerController implements IInterviewerController {
  constructor(private readonly interviewerService: InterviewerService) { }

  @Get("payment")
  async getInterviewerPaymentHistory(@Headers('x-user-id') interviewerId: string): Promise<{ success: boolean, message: string, paymentData: WalletDTO }> {
    try {
      if (!interviewerId) {
        throw new HttpException('Missing interviewer ID in headers', HttpStatus.BAD_REQUEST);
      }
      const paymentData = await this.interviewerService.walletData(interviewerId);
      return { success: true, message: "payement history of the interviewer", paymentData: paymentData }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("wallet-withdraw")
  async walletWithdraw(@Headers('x-user-id') interviewerId: string, @Body() body: { amount: number }): Promise<{ success: boolean, message: string, walletData: WalletDTO }> {
    try {
      const walletData = await this.interviewerService.walletWithdraw(interviewerId, body.amount);
      return { success: true, message: "payement history of the interviewer", walletData: walletData }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
