export interface ICandidateController {
    paymentForBooking(candidateId: string,data: any): Promise<any>;
    verifyPayment(sessionId: {sessionId: string}): Promise<any>
}