import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IAdminRepository } from "../interface/IAdminRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Scheduled } from "src/candidate/model/scheduled.schema";

@Injectable()
export class AdminRepository implements IAdminRepository {
    constructor(@InjectModel(Scheduled.name) private readonly shceduleModel: Model<Scheduled>) { }

    async getInterviews(): Promise<any> {
        try {
            const interviewData = await this.shceduleModel.find().exec();
            return interviewData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}