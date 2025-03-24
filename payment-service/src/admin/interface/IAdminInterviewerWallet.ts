export interface IAdminInterviewerWallet {
    createWallet(walletData: any): Promise<any>
    updateWallet(walletData: any): Promise<any>
    findExistingWallet(interviewerId: string): Promise<any>
}