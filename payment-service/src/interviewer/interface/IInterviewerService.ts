import { IPayment, IWallet } from "./interface";

export interface IInterviewerService {
    // getPaymentData(interviewerId: string): Promise<IPayment[]>
    walletData(interviewerId: string): Promise<IWallet>
    walletWithdraw(interviewerId: string, amount: number): Promise<IWallet>
}