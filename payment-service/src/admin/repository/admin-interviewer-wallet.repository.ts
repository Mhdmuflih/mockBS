import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { BaseRepository } from "src/repository/baseRepository";
import { Wallet } from "../model/wallet";
import { IAdminInterviewerWallet } from "../interface/IAdminInterviewerWallet";

@Injectable()
export class AdminInterviewerWallet extends BaseRepository<Wallet> implements IAdminInterviewerWallet {
    constructor(@InjectModel(Wallet.name) private readonly walltetModel: Model<Wallet>) {
        super(walltetModel)
    }

    async createWallet(walletData: any): Promise<any> {
        try {
            console.log(walletData,' this is create wallet data')
            const newWallet = new this.walltetModel(walletData);
            const saveData = await newWallet.save();
            return saveData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateWallet(walletData: any): Promise<any> {
        try {
            console.log(walletData.interviewerId, 'ith ippo enth thenga anavoo')
            const existingWallet = await this.findExistingWallet(walletData.interviewerId);
            console.log( existingWallet, 'this is existing wallet data');
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

    async findExistingWallet(interviewerId: string): Promise<any> {
        try {
            if (!mongoose.Types.ObjectId.isValid(interviewerId)) {
                throw new Error('Invalid ObjectId format');
            }
            return await this.walltetModel.findOne({interviewerId: interviewerId})
            // return await this.walltetModel.findOne({ interviewerId: new mongoose.Types.ObjectId(id) }).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}