export interface ICandidateScheduleRepository {
    scheduleInterview(candidateId: string, scheduleData: any): Promise<any>;
    candidateSceduledInterviews(candidate: string, page: number, limit: number, search: string): Promise<any>;
}