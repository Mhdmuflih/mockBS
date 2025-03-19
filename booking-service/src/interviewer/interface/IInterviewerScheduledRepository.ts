import { ISchedule } from "../../interface/interface";

export interface IInterviewerScheduledRepository {
    scheduledInterviews(interviewerId: string): Promise<ISchedule[]>;
}