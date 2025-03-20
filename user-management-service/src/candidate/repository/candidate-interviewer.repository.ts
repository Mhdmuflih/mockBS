import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Interviewer } from "src/interviewer/Model/interviewer.schema";
import { BaseRepository } from "src/Repository/baseRepository";
import { ICandidateInterviewerRepository } from "../interface/ICandidateInterviewerRepository";
import { IInterviewer } from "src/interviewer/interface/interface";

@Injectable()
export class CandidateInterviewerRepository extends BaseRepository<Interviewer> implements ICandidateInterviewerRepository {
    constructor(@InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>) {
        super(interviewerModel);
    }

    async findInterviewer(interviewerId: string): Promise<IInterviewer | null> {
        try {
            const interviewer = await this.findOneById(interviewerId);
            // const interviewer = await this.interviewerModel.findOne({ _id: interviewerId });
            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}