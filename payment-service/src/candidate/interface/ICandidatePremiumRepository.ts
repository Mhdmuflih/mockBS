export interface ICandidatePremiumRepository {
    existingPremiumData(candidateId: string): Promise<any>
    createPremium(premiumData: any): Promise<any>
    updatePaymentStatus(transactionId: string)
}