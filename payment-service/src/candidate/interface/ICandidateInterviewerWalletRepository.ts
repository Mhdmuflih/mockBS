import { Types } from "mongoose";
import { IWallet } from "./Interface";

export interface ICandidateInterviewerWalletRepository {
    createWallet(walletData: IWallet): Promise<IWallet>;
    updateWallet(walletData: any): Promise<IWallet>;
    findExistingWallet(interviewerId: string | Types.ObjectId): Promise<IWallet>;
}