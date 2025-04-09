import { IWallet } from "src/candidate/interface/Interface"

export interface IAdminService {
    interviewerPayment(page: number, limit: number, search: string): Promise<{ interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number }>
    getDashboradData(): Promise<{ revenue: number, profit: number, profitPremium: number }>;
    getPremiumPaymentData(): Promise<any>
    // payToInterviewer(id: string): Promise<IWallet>
}