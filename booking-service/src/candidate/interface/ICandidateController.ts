export interface ICandidateController {
    getSlotMatchedInterviewer(tech: string): Promise<any>;
    getinterviewerSlotDetails(interviewerId: string, tech: string): Promise<any>;
    scheduledInterviews(candidateId: string): Promise<any>;
    // scheduleInterview(candidateId: string, scheduleData: any): Promise<any>;
    getBookingData(bookingData: any): Promise<any>
}