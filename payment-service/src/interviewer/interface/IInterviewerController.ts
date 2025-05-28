import { WalletDTO } from "../dto/interviewer.wallet.dto";

export interface IInterviewerController {
    getInterviewerPaymentHistory(interviewerId: string): Promise<{ success: boolean, message: string, paymentData: WalletDTO }>
    walletWithdraw(interviewerId: string, body: { amount: number }): Promise<{ success: boolean, message: string, walletData: WalletDTO }>
}