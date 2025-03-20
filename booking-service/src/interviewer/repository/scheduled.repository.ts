import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IInterviewerScheduledRepository } from "../interface/IInterviewerScheduledRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Scheduled } from "src/candidate/model/scheduled.schema";
import { Model } from "mongoose";
import { ISchedule } from "../../interface/interface";
import { BaseRepository } from "src/repository/base.respository";

@Injectable()
export class ScheduleRepository extends BaseRepository<Scheduled> implements IInterviewerScheduledRepository {
    constructor(@InjectModel(Scheduled.name) private readonly scheduledModal: Model<Scheduled>) {
        super(scheduledModal)
    }

    async scheduledInterviews(interviewerId: string, page: number, limit: number, search: string): Promise<{total: number, data:ISchedule[]}> {
        try {
            const scheduleData = await this.findWithPagination({interviewerId}, page, limit, search)
            // const scheduleData = await this.scheduledModal.find({interviewerId: interviewerId});
            return scheduleData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}