import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IAdminRepository } from "../interface/IAdminRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Scheduled } from "src/candidate/model/scheduled.schema";
import { ISchedule } from "src/interface/interface";
import { BaseRepository } from "src/repository/base.respository";

@Injectable()
export class AdminRepository extends BaseRepository<Scheduled> implements IAdminRepository {
    constructor(@InjectModel(Scheduled.name) private readonly shceduleModel: Model<Scheduled>) {
        super(shceduleModel)
    }

    async getInterviews(page: number, limit: number, search?: string): Promise<{total: number, data: ISchedule[]}> {
        try {
            const interviewData = await this.findWithPagination({}, page, limit, search);
            // const interviewData = await this.findAll()
            // const interviewData = await this.shceduleModel.find().exec();
            return interviewData;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}