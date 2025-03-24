export interface IInterviewerWalletRepository {
    getWalletHistoryData(interviewerId: string): Promise<any>
    walletWithdraw(interviewerId: string, amount: number): Promise<any>
}