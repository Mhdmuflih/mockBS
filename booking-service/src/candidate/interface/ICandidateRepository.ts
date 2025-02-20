export interface ICandidateScheduleRepository {
    scheduleInterview(candidateId: string, scheduleData: any): Promise<any>
}