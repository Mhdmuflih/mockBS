import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet } from "src/admin/model/wallet";
import { BaseRepository } from "src/repository/baseRepository";
import { IInterviewerWalletRepository } from "../interface/IInterviewerWalletRepository";

@Injectable()
export class InterviewerWalletRepository extends BaseRepository<Wallet> implements IInterviewerWalletRepository {
    constructor(@InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>) {
        super(walletModel);
    }

    async getWalletHistoryData(interviewerId: string): Promise<any> {
        try {
            return await this.walletModel.findOne({ interviewerId: interviewerId }).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async walletWithdraw(interviewerId: string, amount: number): Promise<any> {
        try {
            const walletData = await this.walletModel.findOne({ interviewerId: interviewerId });
            walletData.balance -= amount;
            walletData.walletHistory.push({
                date: new Date(),
                description: "Debit",
                amount: -amount,
                currentBalance: walletData.balance
            });
            const updatedData = await walletData.save();
            return updatedData
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}