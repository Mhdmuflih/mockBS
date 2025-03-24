import { IPayment, IWallet } from "./interface";

export interface IInterviewerController {
    getInterviewerPaymentHistory(interviewerId: string): Promise<{ success: boolean, message: string, paymentData: IWallet }>
    walletWithdraw(interviewerId: string, body: { amount: number }): Promise<{ success: boolean, message: string, walletData: IWallet }>
}