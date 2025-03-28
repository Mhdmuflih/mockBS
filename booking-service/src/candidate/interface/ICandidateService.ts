import { ISchedule } from "src/interface/interface";
import { IInterviewer } from "./interface";

export interface ICandidateService {
    getMatchedSlot(tech: string): Promise<IInterviewer[]>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<any>;
    scheduleInterview(candidateId: string, scheduleData: any): Promise<void>
    scheduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{ scheduledInterview: ISchedule[], totalRecords: number, totalPages: number, currentPage: number }>
}