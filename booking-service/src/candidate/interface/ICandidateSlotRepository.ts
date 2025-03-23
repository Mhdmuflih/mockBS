import { IInterviewerSlot } from "src/interface/interface";

export interface ICandidateSlotRepository {
    getMatchSlot(tech: string): Promise<IInterviewerSlot[]>;
    getSlotInterviewerDetails(interviewerId: string, tech: string): Promise<any>;
    updateScheduleDataStatus(scheduleData: any , scheduledId: string): Promise<IInterviewerSlot[]>;
}