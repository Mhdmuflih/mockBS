import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PremiumPayment } from "src/candidate/model/premium.schema";
import { BaseRepository } from "src/repository/baseRepository";
import { IAdminPremiumRepository } from "../interface/IAdminPremiumRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TotalAmountResult } from "../interface/interface";

@Injectable()
export class AdminPremiumRepository extends BaseRepository<PremiumPayment> implements IAdminPremiumRepository {
    constructor(@InjectModel(PremiumPayment.name) private readonly premiumModel: Model<PremiumPayment>) {
        super(premiumModel);
    }

    async getPremiumProfit(): Promise<number> {
        try {
            const result: TotalAmountResult[]  = await this.premiumModel.aggregate([{"$group": {"_id": null, "totalAmount": {$sum: "$amount"}}}]);
            return result.length > 0 ? result[0].totalAmount : 0;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPremiumData(): Promise<any> {
        try {
            const data = await this.premiumModel.find().exec();
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}