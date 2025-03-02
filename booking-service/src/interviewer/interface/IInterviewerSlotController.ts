export interface IInterviewerSlotController {
    addSlot(interviewerId: string, formData: any): Promise<{success: boolean, message: string}>;
    getSlot(interviewerId: string): Promise<any>;
    getScheduledInterviews(interviewerId: string): Promise<any>;
}