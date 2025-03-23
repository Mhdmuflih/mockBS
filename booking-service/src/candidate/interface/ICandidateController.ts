import { IInterviewerSlot, ISchedule } from "src/interface/interface";
import { IInterviewer } from "./interface";

export interface ICandidateController {
    getSlotMatchedInterviewer(tech: string): Promise<{success:boolean; message: string; matchedData: IInterviewer[]}>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<{success: boolean; message: string; slotData: IInterviewerSlot, interviewerData: IInterviewer[]}>;
    scheduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{success: boolean; message: string; scheduledData: { scheduledInterview: ISchedule[], totalRecords: number, totalPages: number, currentPage: number }}>;
    // scheduleInterview(candidateId: string, scheduleData: any): Promise<any>;
    getBookingData(bookingData: any): Promise<any>
}