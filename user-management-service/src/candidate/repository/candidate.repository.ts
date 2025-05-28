import { ICandidateRepository } from '../interface/ICandidateRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate, } from '../Model/candidate.schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/Repository/baseRepository';
import { ICandidate } from '../interface/interface';

@Injectable()
export class CandidateRepository extends BaseRepository<Candidate> implements ICandidateRepository {
    constructor(
        @InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>,
    ) {
        super(candidateModel)
    }

    async findOne(userId: string): Promise<ICandidate | null> {
        try {
            const candidate = await this.findOneById(userId)
            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCandidateData(userId: string, formData: any, fileName: string): Promise<ICandidate | null> {
        try {
            const updateData: Partial<any> = {
                name: formData.name,
                mobile: formData.mobile
            };

            if (fileName) {
                updateData.profileURL = fileName;
            }

            const candidate = await this.update(userId, updateData);

            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePassword(userId: string, securePassword: string): Promise<ICandidate | null> {
        try {
            const updatedCandidate = await this.candidateModel.findOneAndUpdate(
                { _id: userId },
                { $set: { password: securePassword } },
                { new: true }
            ).exec();
            return updatedCandidate;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
