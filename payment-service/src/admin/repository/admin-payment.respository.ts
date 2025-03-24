import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IAdminRepository } from "../interface/IAdminRepository";
import { BaseRepository } from "src/repository/baseRepository";
import { Payment } from "src/candidate/model/payment.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AdminRepository extends BaseRepository<Payment> implements IAdminRepository {
    constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>) {
        super(paymentModel)
    }

    async getInterviewerPaymentHistory(page: number, limit: number, search: string): Promise<any> {
        try {
            return this.findWithPagination({ status: "completed" }, page, limit, search);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateStatus(id: string): Promise<any> {
        try {
            const updateData = await this.paymentModel.findOneAndUpdate({ _id: id }, { $set: { status: "admin send" } }, { new: true });
            return updateData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}