import { ICandidateRatingRepository } from "../Interfaces/candidate/ICandidateRatingRepository";
import { IRating, ReviewRating } from "../Models/rating.Schema";
import { BaseRepository } from "./baseRepository";

class CandidateRatingRepository extends BaseRepository<IRating> implements ICandidateRatingRepository {
    constructor() {
        super(ReviewRating)
    }

    async addInterviewRating(ratingData: {candidateId: string, interviewerId: string, scheduledId: string, slotId: string, ratings: number, comment: string}): Promise<IRating> {
        try {
            const addRating = new ReviewRating(ratingData);
            return await addRating.save();
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`${error.message}`);
        }
    }

    async findReviewRating(ratingData: {candidateId: string, interviewerId: string, scheduledId: string, slotId: string, ratings: number, comment: string}): Promise<IRating | null> {
        try {
            return await ReviewRating.findOne({candidateId: ratingData.candidateId, interviewerId: ratingData.interviewerId,scheduledId: ratingData.scheduledId ,slotId: ratingData.slotId}).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new Error(` ${error.message}`);
        }
    }
}

export default new CandidateRatingRepository();