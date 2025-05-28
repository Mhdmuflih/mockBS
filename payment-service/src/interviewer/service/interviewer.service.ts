import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InterviewerWalletRepository } from '../repository/interviewer-wallet.repository';
import { IInterviewerService } from '../interface/IInterviewerService';
import { WalletDTO } from '../dto/interviewer.wallet.dto';

@Injectable()
export class InterviewerService implements IInterviewerService {
  constructor(
    private readonly interviewerWalletRepository: InterviewerWalletRepository
  ) { }

  async walletData(interviewerId: string): Promise<WalletDTO> {
    try {
      const walletData = await this.interviewerWalletRepository.getWalletHistoryData(interviewerId);
      if (!walletData) {
        throw new Error('Wallet not found for this interviewer');
      }
      return WalletDTO.from(walletData);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async walletWithdraw(interviewerId: string, amount: number): Promise<WalletDTO> {
    try {

      if (amount <= 0) {
        throw new Error("amount must greater than 0");
      }

      const existingWalletData = await this.interviewerWalletRepository.getWalletHistoryData(interviewerId);
      if (!existingWalletData) {
        throw new Error("Wallet not found");
      }

      if (existingWalletData.balance < amount) {
        throw new Error("Insufficient balance");
      }
      const walletData = await this.interviewerWalletRepository.walletWithdraw(interviewerId, amount);
      return WalletDTO.from(walletData);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
