import { ICandidateWallet } from "../interface/Interface";

export class CandidateWalletDTO {
    public _id: string;
    public candidateId: string;
    public balance: number;
    public walletHistory: {
        date: Date;
        amount: number;
        description: string;
        currentBalance: number;
    }[];

    constructor(wallet: ICandidateWallet) {
        this._id = wallet._id.toString();
        this.candidateId = wallet.candidateId.toString();
        this.balance = wallet.balance;
        this.walletHistory = wallet.walletHistory.map(entry => ({
            date: entry.date,
            amount: entry.amount,
            description: entry.description,
            currentBalance: entry.currentBalance,
        }));
    }

    // Static helper methods
    static from(wallet: ICandidateWallet): CandidateWalletDTO {
        return new CandidateWalletDTO(wallet);
    }

    static fromList(wallets: ICandidateWallet[]): CandidateWalletDTO[] {
        return wallets.map(CandidateWalletDTO.from);
    }
}
