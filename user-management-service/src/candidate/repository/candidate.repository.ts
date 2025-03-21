import { ICandidateRepository } from '../interface/ICandidateRepository';
import { ICandidate, IStack } from '../interface/interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate, CandidateDocument } from '../Model/candidate.schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Stack } from 'src/admin/Model/stack.schema';
import { Interviewer } from 'src/interviewer/Model/interviewer.schema';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { CandidateDataDto, UpdateCandidateDto } from '../dtos/candidate-data.dto';
import { StackResponseDto } from '../dtos/stack-response.dto';
import { BaseRepository } from 'src/Repository/baseRepository';

@Injectable()
export class CandidateRepository extends BaseRepository<Candidate> implements ICandidateRepository {
    constructor(
        @InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>,
        // @InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>,
        // @InjectModel(Stack.name) private readonly stackModel: Model<Stack>
    ) {
        super(candidateModel)
    }

    async findOne(userId: string): Promise<CandidateDataDto | null> {
        try {
            const candidate = await this.findOneById(userId)
            // const candidate = await this.candidateModel.findOne({ _id: userId }).exec();
            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async findCandidateByEmail(email: string): Promise<CandidateDataDto | null> {
    //     try {
    //         const candidate = await this.candidateModel.findOne({ email: email });
    //         return candidate;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async updateCandidateData(userId: string, formData: UpdateCandidateDto, fileName: string): Promise<UpdateCandidateDto | null> {
        try {
            const updateData: Partial<UpdateCandidateDto> = {
                name: formData.name,
                mobile: formData.mobile
            };

            if (fileName) {
                updateData.profileURL = fileName;
            }

            const candidate = await this.update(userId, updateData);

            // const candidate = await this.candidateModel.findOneAndUpdate(
            //     { _id: userId },
            //     { $set: updateData },
            //     { new: true, upsert: true }
            // );

            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePassword(userId: string, securePassword: string): Promise<CandidateDataDto | null> {
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

    // async getStack(): Promise<StackResponseDto[]> {
    //     try {
    //         const getStack = await this.stackModel.find();
    //         return getStack;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async findInterviewer(interviewerId: string): Promise<IInterviewer | null> {
    //     try {
    //         const interviewer = await this.interviewerModel.findOne({ _id: interviewerId });
    //         return interviewer;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
