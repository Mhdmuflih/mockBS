export interface ICandidateService {
    getMatchedSlot(tech: string): Promise<any>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<any>;
    scheduleInterview(candidateId: string, scheduleData: any): Promise<void>
    scheduledInterviews(candidateId: string): Promise<any>
}