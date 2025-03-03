export interface IInterviewerController {
    getInterviewerPaymentHistory(interviewerId: string): Promise<any>
}