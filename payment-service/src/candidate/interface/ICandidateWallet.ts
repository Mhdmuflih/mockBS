import { ICandidateWallet } from "./Interface";

export interface ICandidateWalletRepository {
    createWallet(walletData: any): Promise<ICandidateWallet>
    existingWallet(candidateId: any): Promise<ICandidateWallet>
    updateWallet(walletData: any): Promise<ICandidateWallet>
    getWalletData(candidateId: any): Promise<ICandidateWallet>
    findCandidate(candidateId: string): Promise<ICandidateWallet>
    updateBalance(candidateId: any, newBalance: number, historyEntry: any): Promise<ICandidateWallet>
}