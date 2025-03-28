import { IWallet } from "./interface"

export interface IInterviewerWalletRepository {
    getWalletHistoryData(interviewerId: string): Promise<IWallet>
    walletWithdraw(interviewerId: string, amount: number): Promise<IWallet>
}