import { IPayment, PaymentData } from "./Interface";

export interface ICandidateRepository {
    autoDeleteExpiredPayments(data: IPayment): Promise<void>
    savePayment(candidateId: string, data: any): Promise<IPayment>;
    findPayment(data: PaymentData): Promise<IPayment>;
    existingPaymentData(data: PaymentData): Promise<IPayment>;
    verifyPayment(sessionId: string): Promise<IPayment>;
    findPaymentData(sessionId: string): Promise<IPayment>;
    getTotalAmount(candidateId: string): Promise<number>
    findPaymentDataForCancel(candidateId: string, scheduleId: string): Promise<IPayment>
    updateInterviewStatus(candidateId: string, scheduleId: string, interviewStatus: string): Promise<IPayment>
    findThePaymentData(candidateId: string, scheduleId: string): Promise<IPayment>
}