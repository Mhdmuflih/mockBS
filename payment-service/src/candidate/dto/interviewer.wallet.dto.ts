import { IInterviewerWallet } from "../interface/Interface";

export class InterviewerWalletDTO {
    public _id: string;
    public interviewerId: string;
    public balance: number;
    public walletHistory: {
        date: Date;
        amount: number;
        description: string;
        currentBalance: number;
    }[];

    constructor(wallet: IInterviewerWallet) {
        this._id = wallet._id.toString();
        this.interviewerId = wallet.interviewerId.toString();
        this.balance = wallet.balance;
        this.walletHistory = wallet.walletHistory.map(entry => ({
            date: entry.date,
            amount: entry.amount,
            description: entry.description,
            currentBalance: entry.currentBalance,
        }));
    }

    // Static helper methods
    static from(wallet: IInterviewerWallet): InterviewerWalletDTO {
        return new InterviewerWalletDTO(wallet);
    }

    static fromList(wallets: IInterviewerWallet[]): InterviewerWalletDTO[] {
        return wallets.map(InterviewerWalletDTO.from);
    }
}
