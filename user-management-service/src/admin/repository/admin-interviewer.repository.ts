import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Interviewer } from "src/interviewer/Model/interviewer.schema";
import { BaseRepository } from "src/Repository/baseRepository";
import { IAdminInterviewerRepository } from "../interface/IAdminInterviewerRepository";
import { IInterviewer } from "src/interviewer/interface/interface";

@Injectable()
export class AdminInterviewerRepository extends BaseRepository<Interviewer> implements IAdminInterviewerRepository {
    constructor(@InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>) {
        super(interviewerModel);
    }

    async approveDetails(id: string): Promise<IInterviewer> {
        try {
            return await this.interviewerModel.findByIdAndUpdate({ _id: id }, { $set: { isApproved: true } });
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async interviewerAction(id: string): Promise<IInterviewer> {
        try {
            const interviewer = await this.findOneById(id);

            if (!interviewer) {
                throw new BadRequestException('Interviewer not found!');
            }

            const updatedInterviewer = await this.interviewerModel.findOneAndUpdate(
                { _id: id },
                { $set: { isBlocked: !interviewer.isBlocked } },
                { new: true }
            );

            return updatedInterviewer;

        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findInterviewerCount(): Promise<number> {
        try {
            const interviewer = await this.interviewerModel.countDocuments({isApproved: true});
            return interviewer;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findUnApprovedInterviewer(): Promise<number> {
        try {
            const interviewer = await this.interviewerModel.countDocuments({isApproved: false});
            return interviewer;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}