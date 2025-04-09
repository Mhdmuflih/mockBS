import { IRating } from "../../Models/rating.Schema";

export interface IInterviewerRatingRepository {
    viewReviewRating(interviewerId: string, slotId: string, scheduledId: string): Promise<IRating | null>;   
}