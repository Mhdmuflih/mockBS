import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Scheduled } from "../model/scheduled.schema";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ICandidateScheduleRepository } from "../interface/ICandidateRepository";
import { BaseRepository } from "src/repository/base.respository";
import { ISchedule } from "src/interface/interface";

@Injectable()
export class ScheduleRepository extends BaseRepository<Scheduled> implements ICandidateScheduleRepository {
    constructor(
        @InjectModel(Scheduled.name) private readonly scheduledModel: Model<Scheduled>
    ) {
        super(scheduledModel)
    }

    async scheduleInterview(candidateId: string, scheduleData: any): Promise<ISchedule> {
        try {

            return await this.createData({
                candidateId: new Types.ObjectId(candidateId),
                interviewerId: new Types.ObjectId(scheduleData.interviewerId),
                scheduleId: new Types.ObjectId(scheduleData.scheduledId),  // Ensure this matches schema
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
            } as Partial<ISchedule>);

            // console.log(candidateId, slotId, 'this is schedule repository data');
            // const schedule = new this.scheduledModel({
            //     candidateId,
            //     interviewerId: scheduleData.interviewerId,
            //     scheduleId: scheduleData.scheduledId,  // Ensure this matches schema
            //     scheduledSlot: {
            //         stack: scheduleData.scheduledData.stack,
            //         technology: scheduleData.scheduledData.technology,
            //         date: scheduleData.scheduledData.date,
            //         from: scheduleData.scheduledData.from,
            //         to: scheduleData.scheduledData.to,
            //         title: scheduleData.scheduledData.title,
            //         price: scheduleData.scheduledData.price,
            //     },
            //     status: "pending"
            // });

            // await schedule.save();
            // return schedule;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findScheduleInterview(scheduledId: string): Promise<ISchedule> {
        try {
            return await this.findOne(scheduledId);
            // return await this.scheduledModel.findOne({ scheduleId: scheduledId });
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getScheduledInterviewCount(candidateId: string): Promise<number> {
        try {
            const scheduledInterviewCount = await this.scheduledModel.countDocuments({candidateId: candidateId, status: "pending"}) || 0;
            return scheduledInterviewCount;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCompletedInterviewCount(candidateId: string): Promise<number> {
        try {
            const completedInterviewCounts = await this.scheduledModel.countDocuments({candidateId: candidateId, status: "completed"}) || 0;
            return completedInterviewCounts;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCancelledInterviewCount(candidateId: string): Promise<number> {
        try {
            const cancelledInterviewCounts = await this.scheduledModel.countDocuments({candidateId: candidateId, status: "cancelled"}) || 0;
            return cancelledInterviewCounts;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



     async findOneTheSchedule(id: string): Promise<any> {
        try {
            const data = await this.scheduledModel.findOne({_id: id});
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateStatus(id: string, reason: string): Promise<any> {
        try {
            const data = await this.scheduledModel.findOneAndUpdate({_id: id}, {$set:{status: "cancelled",cancelReason: `candidate: ${reason}`}});
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // async candidateSceduledInterviews(candidateId: string, page: number, limit: number, search: string): Promise<{ total: number, data: ISchedule[] }> {
    //     try {
    //         const candidateScheduledData = await this.findWithPagination({ candidateId }, page, limit, search)
    //         // const candidateScheduledData = await this.findAll({candidateId});
    //         // const candidateScheduledData = await this.scheduledModel.find({ candidateId: candidateId });
    //         return candidateScheduledData;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}