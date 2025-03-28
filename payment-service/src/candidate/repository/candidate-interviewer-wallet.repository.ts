import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Wallet } from "src/admin/model/wallet";
import { BaseRepository } from "src/repository/baseRepository";
import { ICandidateInterviewerWalletRepository } from "../interface/ICandidateInterviewerWalletRepository";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { IWallet } from "../interface/Interface";

@Injectable()
export class CandidateInterviewerWalletRepository extends BaseRepository<Wallet> implements ICandidateInterviewerWalletRepository {
    constructor(@InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>) {
        super(walletModel);
    }

    async createWallet(walletData: IWallet): Promise<IWallet> {
        try {
            console.log(walletData, ' this is create wallet data')
            const newWallet = new this.walletModel(walletData);
            const saveData = await newWallet.save();
            return saveData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateWallet(walletData: any): Promise<IWallet> {
        try {
            console.log(walletData.interviewerId, 'ith ippo enth thenga anavoo')
            const existingWallet = await this.findExistingWallet(walletData.interviewerId);
            console.log(existingWallet, 'this is existing wallet data');
            if (existingWallet) {
                existingWallet.balance += walletData.balance;
                existingWallet.walletHistory.push(...walletData.walletHistory);
                const updateData = await existingWallet.save();
                return updateData;
            }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async findExistingWallet(interviewerId: string | Types.ObjectId): Promise<IWallet> {
        try {
            if (!mongoose.Types.ObjectId.isValid(interviewerId)) {
                throw new Error('Invalid ObjectId format');
            }
            return await this.walletModel.findOne({ interviewerId: interviewerId })
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}