import { IInterviewerRepository } from "../Interfaces/interviewer/IInterviewerRepository";
import { IInterviewerService } from "../Interfaces/interviewer/IInterviewerSerivce";
import { IFeedback } from "../Models/feedbackSchema";

export class InterviewerServices implements IInterviewerService {
    constructor(private readonly interviewerRepository: IInterviewerRepository) { }

    async addFeedback(interviewerId: any, feedbackData: any): Promise<any> {
        try {

            const existingFeedback = await this.interviewerRepository.findOneData(feedbackData.slotData._id, feedbackData.candidateData._id);
            if(existingFeedback){
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
            return await this.interviewerRepository.createFeedback(createFeedback);
        } catch (error: any) {
            console.log("Error creating candidate feedback:", error.message);
            throw new Error(`Error creating candidate feedback: ${error.message}`);
        }
    }
}