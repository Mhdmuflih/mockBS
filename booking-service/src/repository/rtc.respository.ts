import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Scheduled } from "src/candidate/model/scheduled.schema";

@Injectable()
export class RTCScheduleRepository {
    constructor(@InjectModel(Scheduled.name) private readonly scheduleModel: Model<Scheduled>) { }

    async getTheScheduleData(scheduleId: string) {
        try {
            console.log(scheduleId,'this is schdeule id')
            const data = await this.scheduleModel.findOne({scheduleId: scheduleId});
            console.log(data, 'for the schedule');
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateInterviewStatus(scheduleId: string) {
        try {
            console.log(scheduleId,'this is schdeule id')
            const data = await this.scheduleModel.findOneAndUpdate({scheduleId: scheduleId}, {$set:{status: "completed"}});
            console.log(data, 'for the schedule');
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}