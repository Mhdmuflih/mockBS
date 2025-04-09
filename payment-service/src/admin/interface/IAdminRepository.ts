export interface IAdminRepository {
    // getInterviewerPaymentHistory(page: number, limit: number, search: string): Promise<any>
     findTotalAmount(): Promise<number>
    // updateStatus(id: string): Promise<any>
}