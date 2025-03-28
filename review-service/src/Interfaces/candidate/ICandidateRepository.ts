export interface ICandidateRepository {
    findTheFeedBackData(slotId: string, scheduledId: string): Promise<any>
}