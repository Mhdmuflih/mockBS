export interface IInterviewerSlotService {
    addSlot(interviewerId: string, formData: any): Promise<any>;
    getSlot(interviewerId: string): Promise<any>;
    getSheduledInterviews(interviewerId: string): Promise<any>;
}