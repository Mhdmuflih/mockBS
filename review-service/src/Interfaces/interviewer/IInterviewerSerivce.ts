export interface IInterviewerService {
    addFeedback(interviewerId: string, feedbackData: any): Promise<any>;
    viewReviewRating(interviewerId: string, slotId: string, scheduledId: string): Promise<any>;
}