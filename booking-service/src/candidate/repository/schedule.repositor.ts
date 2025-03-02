import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Scheduled } from "../model/scheduled.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ICandidateScheduleRepository } from "../interface/ICandidateRepository";

@Injectable()
export class ScheduleRepository implements ICandidateScheduleRepository {
    constructor(
        @InjectModel(Scheduled.name) private readonly scheduledModel: Model<Scheduled>
    ) { }

    async scheduleInterview(candidateId: string, scheduleData: any): Promise<any> {
        try {
            // console.log(candidateId, slotId, 'this is schedule repository data');
            const schedule = new this.scheduledModel({
                candidateId,
                interviewerId: scheduleData.interviewerId,
                scheduleId: scheduleData.scheduledId,  // Ensure this matches schema
                scheduledSlot: {
                    stack: scheduleData.scheduledData.stack,
                    technology: scheduleData.scheduledData.technology,
                    date: scheduleData.scheduledData.date,
                    from: scheduleData.scheduledData.from,
                    to: scheduleData.scheduledData.to,
                    title: scheduleData.scheduledData.title,
                    price: scheduleData.scheduledData.price,
                },
                status: "pending"
            });

            await schedule.save();
            return schedule;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findScheduleInterview(scheduledId: string): Promise<any> {
        try {
            return await this.scheduledModel.findOne({scheduleId: scheduledId});
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async candidateSceduledInterviews(candidateId: string): Promise<any> {
        try {
            const candidateScheduledData = await this.scheduledModel.find({ candidateId: candidateId });
            return candidateScheduledData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}