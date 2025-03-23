import { ISchedule } from "src/interface/interface";

export interface ICandidateScheduleRepository {
    scheduleInterview(candidateId: string, scheduleData: any): Promise<ISchedule>;
    // candidateSceduledInterviews(candidate: string, page: number, limit: number, search: string): Promise<any>;
}