import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAdminService } from '../interface/IAdminService';
import { AdminRepository } from '../repository/admin-payment.respository';


@Injectable()
export class AdminService implements IAdminService {
    // private stripe: Stripe;

    constructor(
        private readonly adminRepository: AdminRepository,
    ) { }

    async interviewerPayment(page: number, limit: number, search: string): Promise<{ interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number }> {
        try {
            const interviewerPaymentData = await this.adminRepository.findWithPagination({status: "completed"}, page, limit, search);
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

    
    async getDashboradData(): Promise<{paymentProfit: number}> {
        try {
            const paymentData: any = await this.adminRepository.findTotalAmount();
            return paymentData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
