import { IInterviewerRatingRepository } from "../Interfaces/interviewer/IInterviewerRatingRepository";
import { IRating, ReviewRating } from "../Models/rating.Schema";
import { BaseRepository } from "./baseRepository";

class InterviewerRatingRepository extends BaseRepository<IRating> implements IInterviewerRatingRepository {
    constructor() {
        super(ReviewRating)
    }

    async viewReviewRating(interviewerId: string, slotId: string, scheduledId: string): Promise<IRating | null> {
        try {
            return await ReviewRating.findOne({interviewerId: interviewerId, slotId: slotId, scheduledId: scheduledId});
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error create candidate add review rating: ${error.message}`);
        }
    }


}

export default new InterviewerRatingRepository();