import { WalletDTO } from "../dto/interviewer.wallet.dto";

export interface IInterviewerService {
    walletData(interviewerId: string): Promise<WalletDTO>
    walletWithdraw(interviewerId: string, amount: number): Promise<WalletDTO>
}