import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BaseRepository } from "src/repository/baseRepository";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CandidateWallet } from "../model/candidate-wallet.schema";
import { ICandidateWallet } from "../interface/ICandidateWallet";

@Injectable()
export class CandidateWalletRepository extends BaseRepository<CandidateWallet> implements ICandidateWallet {
    constructor(@InjectModel(CandidateWallet.name) private readonly candidateWalletModel: Model<CandidateWallet>) {
        super(candidateWalletModel);
    }

    async createWallet(walletData: any): Promise<any> {
        try {
            const newWallet = new this.candidateWalletModel(walletData);
            const saveData = await newWallet.save();
            return saveData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async existingWallet(candidateId: any): Promise<any> {
        try {
            return await this.candidateWalletModel.findOne({ candidateId: candidateId });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async updateWallet(walletData: any): Promise<any> {
        try {
            console.log(walletData.candidateId, 'this is update wallet time the candidate id');
            const existingWallet = await this.existingWallet(walletData.candidateId);
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


    async getWalletData(candidateId: any): Promise<any> {
        try {
            const walletData = await this.candidateWalletModel.findOne({ candidateId: new mongoose.Types.ObjectId(candidateId) });
            return walletData
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async findCandidate(candidateId: string): Promise<any> {
        try {
            const data = await this.candidateWalletModel.findOne({ candidateId: candidateId });
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateBalance(candidateId: any, newBalance: number, historyEntry: any): Promise<any> {
        try {
            const wallet = await this.candidateWalletModel.findOne({ candidateId });
            if (!wallet) {
                throw new Error("Wallet not found for update");
            }

            wallet.balance = newBalance;
            wallet.walletHistory.push(historyEntry);

            return await wallet.save();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'Wallet update failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}