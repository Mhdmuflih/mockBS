import { IInterviewerSlot } from "src/interface/interface";

export interface ICandidateSlotRepository {
    getMatchSlot(tech: string): Promise<IInterviewerSlot[]>;
    updateSlotInterviewerExpire(interviewerId: string, tech: string): Promise<any>
    getSlotInterviewerDetails(interviewerId: string, tech: string): Promise<IInterviewerSlot[]>
    updateScheduleDataStatus(scheduleData: any, scheduledId: string): Promise<IInterviewerSlot[]>;
    updateScheduleDataStatusCancelled(scheduledId: string): Promise<any>
}