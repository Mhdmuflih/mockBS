export interface ICandidateService {
    fetchCandidateFeedback(slotId: string, scheduledId: string): Promise<any>
    addInterviewRating(candidateId: any, interviewerId: string, scheduledId: string, slotId: string, ratings: number, comment: string): Promise<any>
}