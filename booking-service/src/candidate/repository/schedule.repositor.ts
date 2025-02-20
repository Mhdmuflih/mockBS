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
                scheduleId: scheduleData.scheduledSlot.scheduleId,  // Make sure the field name matches the schema
                scheduledSlot: {
                    stack: scheduleData.scheduledSlot.stack,
                    technology: scheduleData.scheduledSlot.technology,
                    date: scheduleData.scheduledSlot.date,
                    from: scheduleData.scheduledSlot.from,
                    to: scheduleData.scheduledSlot.to,
                    title: scheduleData.scheduledSlot.title,
                    price: scheduleData.scheduledSlot.price,
                    description: scheduleData.scheduledSlot.description
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
}