import { IRating } from "../../Models/rating.Schema";

export interface ICandidateRatingRepository {
    addInterviewRating(ratingData: { candidateId: string, interviewerId: string, scheduledId: string, slotId: string, ratings: number, comment: string }): Promise<IRating>
    findReviewRating(ratingData: { candidateId: string, interviewerId: string, scheduledId: string, slotId: string, ratings: number, comment: string }): Promise<IRating | null>
}