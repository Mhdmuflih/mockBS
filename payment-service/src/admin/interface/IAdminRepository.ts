export interface IAdminRepository {
    // getInterviewerPaymentHistory(page: number, limit: number, search: string): Promise<any>
     findTotalAmount(): Promise<{totalAmount: number}>
    // updateStatus(id: string): Promise<any>
}