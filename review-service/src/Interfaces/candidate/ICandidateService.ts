import { FeedbackDTO } from "../../DTO/feedbackDTO"
import { RatingDTO } from "../../DTO/ratingDTO"

export interface ICandidateService {
    fetchCandidateFeedback(slotId: string, scheduledId: string): Promise<FeedbackDTO>
    addInterviewRating(candidateId: any, interviewerId: string, scheduledId: string, slotId: string, ratings: number, comment: string): Promise<RatingDTO>
}