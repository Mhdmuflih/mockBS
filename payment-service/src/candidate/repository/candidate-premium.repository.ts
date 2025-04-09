import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BaseRepository } from "src/repository/baseRepository";
import { PremiumPayment } from "../model/premium.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICandidatePremiumRepository } from "../interface/ICandidatePremiumRepository";

@Injectable()
export class CandidatePremiumRepository extends BaseRepository<PremiumPayment> implements ICandidatePremiumRepository {
    constructor(@InjectModel(PremiumPayment.name) private readonly premiumModel: Model<PremiumPayment>) {
        super(premiumModel);
    }

    async existingPremiumData(candidateId: string): Promise<any> {
        try {
            const existingData = await this.premiumModel.findOne({ candidateId: candidateId });
            return existingData
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createPremium(premiumData: any): Promise<any> {
        try {
            console.log(premiumData, 'this is premium Data for the caniddate repo');
            const saveData = new this.premiumModel(premiumData);
            console.log(saveData, 'this is saved data');
            const saved = await saveData.save();
            console.log(saved, 'this is saved');
            return saved;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePaymentStatus(transactionId: string) {
        try {
            const updatedData = await this.premiumModel.updateOne({ transactionId: transactionId }, { $set: { paymentStatus: "completed" } });
            return updatedData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}