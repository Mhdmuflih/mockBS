export interface IInterviewerScheduledRepository {
    scheduledInterviews(interviewerId: string): Promise<any>;
}