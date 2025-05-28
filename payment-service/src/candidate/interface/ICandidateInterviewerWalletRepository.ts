import { Types } from "mongoose";
import { IInterviewerWallet } from "./Interface";

export interface ICandidateInterviewerWalletRepository {
    createWallet(walletData: IInterviewerWallet): Promise<IInterviewerWallet>;
    updateWallet(walletData: any): Promise<IInterviewerWallet>;
    findExistingWallet(interviewerId: string | Types.ObjectId): Promise<IInterviewerWallet>;
}