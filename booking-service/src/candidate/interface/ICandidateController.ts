import { IInterviewerSlot, ISchedule } from "src/interface/interface";
import { IInterviewer } from "./interface";
import { ScheduleDTO } from "../dto/schedule.dto";
import { InterviewerSlotDTO } from "../dto/interivewerSlot.response.dto";

export interface ICandidateController {
    getSlotMatchedInterviewer(tech: string): Promise<{success:boolean; message: string; matchedData: IInterviewer[]}>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<{success: boolean; message: string; slotData: InterviewerSlotDTO, interviewerData: IInterviewer[]}>;
    scheduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{success: boolean; message: string; scheduledData: { scheduledInterview: ScheduleDTO[], totalRecords: number, totalPages: number, currentPage: number }}>;
    getBookingData(bookingData: any): Promise<any>
}