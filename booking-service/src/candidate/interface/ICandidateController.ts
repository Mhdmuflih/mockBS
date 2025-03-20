import { ISchedule } from "src/interface/interface";

export interface ICandidateController {
    getSlotMatchedInterviewer(tech: string): Promise<any>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<any>;
    scheduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{ success: boolean; message: string; scheduledData: { scheduledInterview: ISchedule[], totalRecords: number, totalPages: number, currentPage: number } }>;
    // scheduleInterview(candidateId: string, scheduleData: any): Promise<any>;
    getBookingData(bookingData: any): Promise<any>
}