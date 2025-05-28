import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ICandidateRepository } from "../interface/ICandidateRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "../model/payment.schema";
import mongoose, { Model } from "mongoose";
import { Cron } from '@nestjs/schedule';
import { BaseRepository } from "src/repository/baseRepository";
import { IPayment, PaymentData } from "../interface/Interface";

@Injectable()
export class CandidateRepository extends BaseRepository<Payment> implements ICandidateRepository {
    constructor(
        @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
    ) {
        super(paymentModel)
    }

    async autoDeleteExpiredPayments(data: IPayment): Promise<void> {
        await this.paymentModel.deleteOne({
            scheduleId: data.scheduleId,
            status: 'pending',
            createdAt: { $lt: new Date(Date.now() - 2 * 60 * 1000) } // 2-minute expiry
        });
    }


    async savePayment(candidateId: string, data: any): Promise<IPayment> {
        try {

            const paymentData = {
                transactionId: data?.sessionId,
                slotId: data.slotId,
                candidateId: candidateId,
                scheduleId: data.scheduleId,
                interviewerId: data.interviewerId,
                interviewerName: data.interviewerName,
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
                status: data.status,
                paymentMethod: data.paymentMethod,
            };

            const saveData = new this.paymentModel(paymentData);
            return await saveData.save();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPayment(data: PaymentData): Promise<IPayment> {
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

    async existingPaymentData(data: PaymentData): Promise<IPayment> {
        try {
            const existing = await this.paymentModel.findOne({
                scheduleId: data.scheduleId,
                status: "completed",
                interviewStatus: { $in: ['pending', 'completed'] }
            });
            return existing;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async verifyPayment(transactionId: string): Promise<IPayment> {
        try {
            const updatePayment = await this.paymentModel.findOneAndUpdate({ transactionId: transactionId }, { $set: { status: "completed" } }, { new: true })
            return updatePayment;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPaymentData(transactionId: string): Promise<IPayment> {
        try {
            const findedData = await this.paymentModel.findOne({ transactionId: transactionId });
            return findedData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTotalAmount(candidateId: string): Promise<number> {
        try {
            const result = await this.paymentModel.aggregate([
                { $match: { candidateId: new mongoose.Types.ObjectId(candidateId), status: "completed" } },
                { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
            ]);
            return result.length > 0 ? result[0].totalAmount : 0;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    async findPaymentDataForCancel(candidateId: string, scheduleId: string): Promise<IPayment> {
        try {
            return await this.paymentModel.findOne({ candidateId: candidateId, scheduleId: scheduleId, status: "completed" });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateInterviewStatus(candidateId: string, scheduleId: string, interviewStatus: string): Promise<IPayment> {
        try {
            const updatedPayment = await this.paymentModel.findOneAndUpdate(
                { candidateId, scheduleId, status: "completed" },
                { $set: { interviewStatus: interviewStatus } },
                { new: true } // return the updated document
            );
            console.log(updatedPayment, 'update this');
            return updatedPayment
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findThePaymentData(candidateId: string, scheduleId: string): Promise<IPayment> {
        try {
            return await this.paymentModel.findOne({ candidateId: candidateId, scheduleId: scheduleId, interviewStatus: "completed" });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}