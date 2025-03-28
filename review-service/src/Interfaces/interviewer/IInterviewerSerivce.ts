export interface IInterviewerService {
    addFeedback(interviewerId: string, feedbackData: any): Promise<any>;
}