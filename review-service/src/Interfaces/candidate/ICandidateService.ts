export interface ICandidateService {
    fetchCandidateFeedback(slotId: string, scheduledId: string): Promise<any>
}