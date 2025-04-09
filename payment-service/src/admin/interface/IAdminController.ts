export interface IAdminController {
    interviewerPaymentDetails(page: number, limit: number, search?: string): Promise<{ success: boolean, message: string, interviewerPaymentData: { interviewerPaymentData: any, totalRecords: number, totalPages: number, currentPage: number } }>
    getDashboard(): Promise<{ success: boolean, message: string, revenue: number, profit: number, profitPremium: number }>
    premiumPaymentDetails(): Promise<{ success: boolean, message: string, premiumData: any }>
}