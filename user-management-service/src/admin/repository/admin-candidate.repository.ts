import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ICandidate } from "src/candidate/interface/interface";
import { BaseRepository } from "src/Repository/baseRepository";
import { IAdminCandidateRepository } from "../interface/IAdminCandidateRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Candidate } from "src/candidate/Model/candidate.schemas";
import { Model } from "mongoose";

@Injectable()
export class AdminCandidateRepository extends BaseRepository<Candidate> implements IAdminCandidateRepository {
    constructor(@InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>) {
        super(candidateModel);
    }
    
    async candidateAction(id: string): Promise<ICandidate> {
        try {
            const candidate = await  this.findOneById(id);
            // const candidate = await this.candidateModel.findOne({ _id: id });

            if (!candidate) {
                throw new BadRequestException('Candidate not found!');
            }

            const updatedCandidate = await this.candidateModel.findOneAndUpdate(
                { _id: id },
                { $set: { isBlocked: !candidate.isBlocked } },
                { new: true }
            );

            return updatedCandidate;

        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findCandidateCount(): Promise<number> {
        try {
            const candidate = await this.candidateModel.countDocuments();
            return candidate;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findPremiumCandidateCount(): Promise<number> {
        try {
            const candidate = await this.candidateModel.countDocuments({premium: true});
            return candidate;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}