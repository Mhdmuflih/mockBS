import { FeedbackDTO } from "../DTO/feedbackDTO";
import { RatingDTO } from "../DTO/ratingDTO";
import { IInterviewerRatingRepository } from "../Interfaces/interviewer/IInterviewerRatingRepository";
import { IInterviewerRepository } from "../Interfaces/interviewer/IInterviewerRepository";
import { IInterviewerService } from "../Interfaces/interviewer/IInterviewerSerivce";
import { IFeedback } from "../Models/feedbackSchema";

export class InterviewerServices implements IInterviewerService {
    constructor(
        private readonly interviewerRepository: IInterviewerRepository,
        private readonly inteviewerRatingRepository: IInterviewerRatingRepository
    ) { }

    async addFeedback(interviewerId: any, feedbackData: any): Promise<FeedbackDTO> {
        try {

            const existingFeedback: IFeedback = await this.interviewerRepository.findOneData(feedbackData.slotData._id, feedbackData.candidateData._id);
            if (existingFeedback) {
                throw new Error("alreday added this candidate feedback");
            }

            const createFeedback: any = {
                candidateId: feedbackData.candidateData._id,
                interviewerId: interviewerId,
                scheduledId: feedbackData.slotData.scheduledId,
                slotId: feedbackData.slotData._id,
                problemSolving: feedbackData.problem,
                technology: feedbackData.tech,
                communication: feedbackData.communication,
                commants: feedbackData.comments
            };
            const feedback =  await this.interviewerRepository.createFeedback(createFeedback);
            return FeedbackDTO.from(feedback);
        } catch (error: any) {
            console.log("Error creating candidate feedback:", error.message);
            throw new Error(`Error creating candidate feedback: ${error.message}`);
        }
    }

    async viewReviewRating(interviewerId: string, slotId: string, scheduledId: string): Promise<RatingDTO> {
        try {
            const rating = await this.inteviewerRatingRepository.viewReviewRating(interviewerId, slotId, scheduledId);
            if(!rating) {
                throw new Error("Rating is not Found");
            }
            return RatingDTO.from(rating);
        } catch (error: any) {
            console.log("Error creating candidate feedback:", error.message);
            throw new Error(`Error creating candidate feedback: ${error.message}`);
        }
    }

}