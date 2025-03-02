export interface ICandidateRepository {
    savePayment(candidateId: string, data: any): Promise<any>;
    findPaymentData(sessionId: string): Promise<any>;
    verifyPayment(sessionId: string): Promise<any>;
}