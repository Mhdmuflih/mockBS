import { ISchedule } from "src/interface/interface";

export interface ICandidateScheduleRepository {
    scheduleInterview(candidateId: string, scheduleData: any): Promise<ISchedule>;
    findScheduleInterview(scheduledId: string): Promise<ISchedule>
    getScheduledInterviewCount(candidateId: string): Promise<number>
    getCompletedInterviewCount(candidateId: string): Promise<number>
    getCancelledInterviewCount(candidateId: string): Promise<number>
    findOneTheSchedule(id: string): Promise<any>
    updateStatus(id: string, reason: string): Promise<any>
}