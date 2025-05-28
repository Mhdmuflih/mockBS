import { IWallet } from "../interface/interface";

export class WalletDTO {
  public interviewerId: string;
  public balance: number;
  public walletHistory: {
    date: Date;
    amount: number;
    description: string;
    currentBalance: number;
  }[];

  constructor(wallet: IWallet) {
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
  static from(wallet: IWallet): WalletDTO {
    return new WalletDTO(wallet);
  }

  static fromList(wallets: IWallet[]): WalletDTO[] {
    return wallets.map(WalletDTO.from);
  }
}
