import { ISchedule } from "src/interface/interface";
import { IInterviewer } from "./interface";
import { ScheduleDTO } from "../dto/schedule.dto";
import { InterviewerSlotDTO } from "../dto/interivewerSlot.response.dto";

export interface ICandidateService {
    getMatchedSlot(tech: string): Promise<IInterviewer[]>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<[InterviewerSlotDTO[], IInterviewer]>;
    scheduleInterview(candidateId: string, scheduleData: any): Promise<void>
    scheduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{ scheduledInterview: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number }>
}