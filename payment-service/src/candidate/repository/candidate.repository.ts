import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ICandidateRepository } from "../interface/ICandidateRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "../model/payment.schema";
import { Model } from "mongoose";
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CandidateRepository implements ICandidateRepository {
    constructor(
        @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
    ) { }

    async autoDeleteExpiredPayments(data: any) {
        await this.paymentModel.deleteOne({
            scheduleId: data.scheduleId,
            status: 'pending',
            createdAt: { $lt: new Date(Date.now() - 2 * 60 * 1000) } // 2-minute expiry
        });
    }
    

    async savePayment(candidateId: string, data: any): Promise<any> {
        try {

            const paymentData = {
                transactionId: data.sessionId,
                slotId: data.slotId,
                candidateId: candidateId,
                scheduleId: data.scheduleId,
                interviewerId: data.interviewerId,
                amount: data.amount,
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
            const existing = await this.paymentModel.findOne({
                scheduleId: data.scheduleId, // Ensure this matches correctly
                status: "pending"
            });
            return existing
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async existingPaymentData(data: any) {
        try {
            const existing = await this.paymentModel.findOne({
                scheduleId: data.scheduleId,
                status:"completed"
            });
            return existing;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async verifyPayment(transactionId: string): Promise<any> {
        try {
            const data =  await this.paymentModel.findOneAndUpdate({ transactionId: transactionId }, { $set: { status: "completed" } }, { new: true })
            console.log(data, 'this is update data');
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPaymentData(transactionId: string): Promise<any> {
        try {
            const data =  await this.paymentModel.findOne({ transactionId: transactionId });
            console.log(data, 'this is that data')
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}