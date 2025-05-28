import { IFeedback } from "../../Models/feedbackSchema";

export interface ICandidateRepository {
    findTheFeedBackData(slotId: string, scheduledId: string): Promise<IFeedback | null>
}