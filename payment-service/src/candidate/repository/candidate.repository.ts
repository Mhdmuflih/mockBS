import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ICandidateRepository } from "../interface/ICandidateRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "../model/payment.schema";
import { Model } from "mongoose";

@Injectable()
export class CandidateRepository implements ICandidateRepository {
    constructor(
        @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
    ) { }

    async savePayment(candidateId: string, data: any): Promise<any> {
        try {

            const paymentData = {
                slotId: data.slotId,
                candidateId: candidateId,
                scheduleId: data.scheduleId,
                interviewerId: data.interviewerId,
                amount: data.amount,
                sessionId: data.sessionId,
                scheduleData: {
                    stack: data.scheduleData.stack,
                    technology: data.scheduleData.technology,
                    date: data.scheduleData.date,
                    from: data.scheduleData.from,
                    to: data.scheduleData.to,
                    title: data.scheduleData.title,
                    price: data.scheduleData.price
                },
                status: 'pending',
                paymentMethod: 'credit_card',
            };

            // console.log(paymentData, 'this is payment data')
            const saveData = new this.paymentModel(paymentData);
            return await saveData.save();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPayment(candidateId: string, data: any) {
        try {
            return await this.paymentModel.findOneAndDelete({
                candidateId: candidateId,
                interviewerId: data.interviewerId,
                scheduleId: data.scheduleId, // Ensure this matches correctly
                status: "pending"
            });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async verifyPayment(sessionId: string): Promise<any> {
        try {
            return await this.paymentModel.findOneAndUpdate({ sessionId: sessionId }, { $set: { status: "completed" } })
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPaymentData(sessionId: string): Promise<any> {
        try {
            return await this.paymentModel.findOne({ sessionId: sessionId });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}