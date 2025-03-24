export interface IAdminController {
    interviewerPaymentDetails(page: number, limit: number, search?: string): Promise<{ success: boolean, message: string, interviewerPaymentData: { interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number } }>
}