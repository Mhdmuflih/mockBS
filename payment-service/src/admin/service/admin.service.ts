import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAdminService } from '../interface/IAdminService';
import { AdminRepository } from '../repository/admin-payment.respository';
import { AdminPremiumRepository } from '../repository/admin-premium.repository';


@Injectable()
export class AdminService implements IAdminService {
    // private stripe: Stripe;

    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly adminPremiumRepository: AdminPremiumRepository
    ) { }

    async interviewerPayment(page: number, limit: number, search: string): Promise<{ interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number }> {
        try {
            const interviewerPaymentData = await this.adminRepository.findWithPagination({ status: "completed" }, page, limit, search);
            // const interviewerPaymentData = await this.adminRepository.getInterviewerPaymentHistory(page, limit, search);
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


    async getDashboradData(): Promise<{ revenue: number, profit: number, profitPremium: number }> {
        try {
            const totalAmount: number = await this.adminRepository.findTotalAmount();
            const profit = totalAmount * 0.1;
            const profitPremium: number = await this.adminPremiumRepository.getPremiumProfit();
            return { revenue: totalAmount  , profit: profit, profitPremium: profitPremium };
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPremiumPaymentData(): Promise<any> {
        try {
            const premiumData = await this.adminPremiumRepository.getPremiumData();
            return premiumData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
