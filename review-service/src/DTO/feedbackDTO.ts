import { IFeedback } from "../Models/feedbackSchema";

export class FeedbackDTO {
    public candidateId: string;
    public interviewerId: string;
    public scheduledId: string;
    public slotId: string;
    public problemSolving: string;
    public technology: string;
    public communication: string;
    public commants: string;

    constructor(feedback: IFeedback) {
        this.candidateId = feedback.candidateId.toString();
        this.interviewerId = feedback.interviewerId.toString();
        this.scheduledId = feedback.scheduledId.toString();
        this.slotId = feedback.slotId.toString();
        this.problemSolving = feedback.problemSolving;
        this.technology = feedback.technology;
        this.communication = feedback.communication;
        this.commants = feedback.commants;
    }

    // Static helper methods
    static from(feedback: IFeedback): FeedbackDTO {
        return new FeedbackDTO(feedback);
    }

    static fromList(feedbacks: IFeedback[]): FeedbackDTO[] {
        return feedbacks.map(FeedbackDTO.from);
    }
}
