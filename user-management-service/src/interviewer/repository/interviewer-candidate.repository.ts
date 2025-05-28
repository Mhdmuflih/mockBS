import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Candidate } from "src/candidate/Model/candidate.schemas";
import { BaseRepository } from "src/Repository/baseRepository";
import { IInterviewerCandidateRepository } from "../interface/IInterviewerCandidateRepository";

@Injectable()
export class InterviewerCandidateRepository extends BaseRepository<Candidate> implements IInterviewerCandidateRepository {
    constructor(@InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>) {
        super(candidateModel);
    }
}