export interface ICandidateService {
    paymentForBooking(candidateId: string, data: any): Promise<any>;
    verifyPayment(sessionId: string): Promise<any>
}