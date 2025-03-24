import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAdminService } from '../interface/IAdminService';
import { AdminRepository } from '../repository/admin-payment.respository';
import { AdminInterviewerWallet } from '../repository/admin-interviewer-wallet.repository';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import { IPayment, IWallet } from 'src/candidate/interface/Interface';

@Injectable()
export class AdminService implements IAdminService {
    // private stripe: Stripe;

    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly adminWalletRepository: AdminInterviewerWallet
    ) {
        // this.stripe = new Stripe("sk_test_51QvsEdGUzdkKqzcdinByZpi9wyrb6JfwF0AVaNBOGGBLernXeTVszLCIFd19AFzPBMMqtkjLhnflACczbZtowhfW00AhK9XPQ0");

    }

    async interviewerPayment(page: number, limit: number, search: string): Promise<{interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number}> {
        try {
            const interviewerPaymentData = await this.adminRepository.getInterviewerPaymentHistory(page, limit, search);
            return {
                interviewerPaymentData: interviewerPaymentData.data,
                totalRecords: interviewerPaymentData.total,
                totalPages: Math.ceil(interviewerPaymentData.total / limit),
                currentPage: page
            }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async payToInterviewer(id: string): Promise<IWallet> {
        try {

            const paymentData: any = await this.adminRepository.findOneById(id);
            console.log(paymentData,'this is payment data');

            if (!paymentData) {
                throw new Error('Payment record not found');
            }

            if (paymentData.status !== "completed") {
                throw new Error('Admin already sent this money');
            }

            // scheduleData: {
            //     stack: 'Backend',
            //     technology: 'NodeJS',
            //     date: '2025-03-20',
            //     from: '2:00 PM',
            //     to: '2:30 PM',
            //     title: 'Node',
            //     price: 2499,
            //     _id: new ObjectId('67d7b04dbd2f89ad21fe265f')
            //   },

            const walletData: any = {
                interviewerId: paymentData.interviewerId.toString(),
                balance: Math.round((paymentData.amount - (paymentData.amount * 0.1))),
                walletHistory: [
                    {
                        date: new Date(),
                        description: "credit",
                        amount: Math.round((paymentData.amount - (paymentData.amount * 0.1))),
                    }
                ]
            }

            const existingWallet = await this.adminWalletRepository.findExistingWallet(paymentData.interviewerId.toString());
            if (existingWallet) {
                const data: any = await this.adminWalletRepository.updateWallet(walletData);
                if (data) {
                    await this.adminRepository.updateStatus(paymentData._id);
                    return;
                }
            } else {
                const data: any = await this.adminWalletRepository.createWallet(walletData);
                if (data) {
                    await this.adminRepository.updateStatus(paymentData._id);
                    return
                }
            }


            // const session = await this.stripe.checkout.sessions.create({
            //     payment_method_types: ["card"],
            //     mode: "payment",
            //     client_reference_id: id,
            //     line_items: [
            //       {
            //         price_data: {
            //           currency: "usd",
            //           unit_amount: Math.round((paymentData.amount - (paymentData.amount * 0.1)) * 100),
            //           product_data: {
            //             name: `Payment to Interviewer Wallet`,
            //           }
            //         },
            //         quantity: 1
            //       }
            //     ],
            //     success_url: `http://localhost:5173/admin/payment-details`,
            //     cancel_url: `http://localhost:5173/admin/payment-details?status=cancelled`
            //   });
            //   return session

            // const interviewerPayedData = await this.adminWalletRepository.payToInterviewer(id);
            // console.log(interviewerPayedData,'kjlasdhfljasdfj');
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
