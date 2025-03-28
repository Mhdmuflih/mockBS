import { IPayment, PaymentData } from "./Interface";

export interface ICandidateRepository {
    autoDeleteExpiredPayments(data: IPayment): Promise<void>
    savePayment(candidateId: string, data: any): Promise<IPayment>;
    findPayment(data: PaymentData): Promise<IPayment>;
    existingPaymentData(data: PaymentData): Promise<IPayment>;
    findPaymentData(sessionId: string): Promise<IPayment>;
    verifyPayment(sessionId: string): Promise<IPayment>;
}