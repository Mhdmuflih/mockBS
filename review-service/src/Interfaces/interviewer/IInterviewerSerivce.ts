import { FeedbackDTO } from "../../DTO/feedbackDTO";
import { RatingDTO } from "../../DTO/ratingDTO";

export interface IInterviewerService {
    addFeedback(interviewerId: string, feedbackData: any): Promise<FeedbackDTO>;
    viewReviewRating(interviewerId: string, slotId: string, scheduledId: string): Promise<RatingDTO>;
}