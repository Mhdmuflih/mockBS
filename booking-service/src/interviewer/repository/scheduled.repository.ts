import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IInterviewerScheduledRepository } from "../interface/IInterviewerScheduledRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Scheduled } from "src/candidate/model/scheduled.schema";
import { Model } from "mongoose";
import { ISchedule } from "../../interface/interface";

@Injectable()
export class ScheduleRepository implements IInterviewerScheduledRepository {
    constructor(@InjectModel(Scheduled.name) private readonly scheduledModal: Model<Scheduled>) { }

    async scheduledInterviews(interviewerId: string): Promise<ISchedule[]> {
        try {
            const scheduleData = await this.scheduledModal.find({interviewerId: interviewerId});
            return scheduleData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}