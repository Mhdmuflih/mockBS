export interface IInterviewerSlotRepository {
    create(interviewerId: string,formData: any): Promise<any>;
    updateScheduleData(interviewerId: string, updatedSchedule: any, date: any): Promise<any>;
    getSlot(interviewerId: string): Promise<any>;
}