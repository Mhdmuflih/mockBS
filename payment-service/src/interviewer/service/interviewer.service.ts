import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateInterviewerDto } from '../dto/create-interviewer.dto';
// import { UpdateInterviewerDto } from '../dto/update-interviewer.dto';
// import { InterviewerRepository } from '../repository/interviewer.repository';
import { InterviewerWalletRepository } from '../repository/interviewer-wallet.repository';
import { IPayment, IWallet } from '../interface/interface';
import { IInterviewerService } from '../interface/IInterviewerService';

@Injectable()
export class InterviewerService implements IInterviewerService {
  constructor(
    // private readonly interviewerRepository: InterviewerRepository,
    private readonly interviewerWalletRepository: InterviewerWalletRepository
  ) { }

  // async getPaymentData(interviewerId: string): Promise<IPayment[]> {
  //   try {
  //     const payment = await this.interviewerRepository.getPaymentHistoryData(interviewerId);
  //     return payment;
  //   } catch (error: any) {
  //     console.log(error.message);
  //     throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async walletData(interviewerId: string): Promise<IWallet> {
    try {
      const walletData = await this.interviewerWalletRepository.getWalletHistoryData(interviewerId);
      return walletData;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async walletWithdraw(interviewerId: string, amount: number): Promise<IWallet> {
    try {

      if(amount <= 0) {
        throw new Error("amount must greater than 0");
      }

      const existingWalletData = await this.interviewerWalletRepository.getWalletHistoryData(interviewerId);
      if(!existingWalletData) {
        throw new Error("Wallet not found");
      }

      if(existingWalletData.balance < amount) {
        throw new Error("Insufficient balance");
      }
      const walletData = await this.interviewerWalletRepository.walletWithdraw(interviewerId, amount);
      return walletData;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
