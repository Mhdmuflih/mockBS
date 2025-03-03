import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IInterviewerRepository } from "../interface/IInterviewerRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "src/candidate/model/payment.schema";
import { Model } from "mongoose";

@Injectable()
export class InterviewerRepository implements IInterviewerRepository {
    constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>) {}

    async getPaymentHistoryData(interviewerId: string): Promise<any> {
        try {
            return await this.paymentModel.find({interviewerId: interviewerId});
        } catch (error: any) {
            console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}