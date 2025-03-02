export interface ICandidateScheduleRepository {
    scheduleInterview(candidateId: string, scheduleData: any): Promise<any>;
    candidateSceduledInterviews(candidate: string): Promise<any>;
}