import { ICandidateRatingRepository } from "../Interfaces/candidate/ICandidateRatingRepository";
import { ICandidateRepository } from "../Interfaces/candidate/ICandidateRepository";
import { ICandidateService } from "../Interfaces/candidate/ICandidateService";
import { IRating } from "../Models/rating.Schema";

export class CandidateService implements ICandidateService {
    constructor(
        private readonly candidateRepository: ICandidateRepository,
        private readonly candidateRatingRepository: ICandidateRatingRepository
    ) { }

    async fetchCandidateFeedback(slotId: string, scheduledId: string): Promise<any> {
        try {
            return await this.candidateRepository.findTheFeedBackData(slotId, scheduledId);
        } catch (error: any) {
            console.log("Error creating candidate feedback:", error.message);
            throw new Error(`Error creating candidate feedback: ${error.message}`);
        }
    }
    async addInterviewRating(candidateId: string, interviewerId: string, scheduledId: string, slotId: string, ratings: number, comment: string): Promise<IRating> {
        try {
            const ratingData = {
                candidateId,
                interviewerId,
                scheduledId,
                slotId,
                ratings,
                comment
            }
            const existingData = await this.candidateRatingRepository.findReviewRating(ratingData);
            if(existingData) {
                throw new Error("already added the review Rating");
            }

            return await this.candidateRatingRepository.addInterviewRating(ratingData);
        } catch (error: any) {
            console.log("Error creating candidate add interview rating:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}