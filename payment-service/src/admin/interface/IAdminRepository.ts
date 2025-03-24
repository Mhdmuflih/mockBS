export interface IAdminRepository {
    getInterviewerPaymentHistory(page: number, limit: number, search: string): Promise<any>
    updateStatus(id: string): Promise<any>
}