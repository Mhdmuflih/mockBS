export interface ICandidateController {
    getSlotMatchedInterviewer(tech: string) : Promise<any>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<any>;
    scheduleInterview(candidateId: string, scheduleData: any): Promise<any>;
}