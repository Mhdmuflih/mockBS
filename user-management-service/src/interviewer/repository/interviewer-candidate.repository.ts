import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Candidate } from "src/candidate/Model/candidate.schemas";
import { BaseRepository } from "src/Repository/baseRepository";
import { IInterviewerCandidateRepository } from "../interface/IInterviewerCandidateRepository";
import { ICandidate } from "src/candidate/interface/interface";

@Injectable()
export class InterviewerCandidateRepository extends BaseRepository<Candidate> implements IInterviewerCandidateRepository {
    constructor(@InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>) {
        super(candidateModel);
    }

    // async getCandidate(candidateId: string): Promise<ICandidate | null> {
    //     try {
    //         return await this.findOneById(candidateId);
    //         // return await this.candidateModel.findOne({_id: candidateId});
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}