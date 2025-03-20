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

    async getAllCandidate(page: number, limit: number, search?: string): Promise<{total: number, data: ICandidate[]}> {
        try {
            const candidatesData = await this.findWithPagination({}, page, limit, search);
            // const candidatesData = await this.findAll();
            // const candidatesData = await this.candidateModel.find().exec();
            return candidatesData;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getcandidateDetails(id: string): Promise<ICandidate> {
        try {
            const candidateDetails = await this.findOneById(id);
            // const candidateDetails = await this.candidateModel.findById({ _id: id });
            return candidateDetails;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

}