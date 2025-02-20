export interface ICandidateSlotRepository {
    getMatchSlot(tech: string): Promise<any>;
    getSlotInterviewerDetails(interviewerId: string, tech: string): Promise<any>;
    updateScheduleDataStatus(scheduleData: any): Promise<any>;
}