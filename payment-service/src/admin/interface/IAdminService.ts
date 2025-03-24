import { IWallet } from "src/candidate/interface/Interface"

export interface IAdminService {
    interviewerPayment(page: number, limit: number, search: string): Promise<{ interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number }>
    payToInterviewer(id: string): Promise<IWallet>
}