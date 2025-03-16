import { ICandidateRepository } from '../interface/ICandidateRepository';
import { ICandidate, IStack } from '../interface/interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from '../Model/candidate.schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Stack } from 'src/admin/Model/stack.schema';
import { Interviewer } from 'src/interviewer/Model/interviewer.schema';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { CandidateCreateDto } from '../dtos/candidate-create.dto';

@Injectable()
export class CandidateRepository implements ICandidateRepository {
    constructor(
        @InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>,
        @InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>,
        @InjectModel(Stack.name) private readonly stackModel: Model<Stack>
    ) { }

    async findOne(userId: string): Promise<ICandidate | null> {
        try {
            const candidate = await this.candidateModel.findOne({ _id: userId }).exec();
            return candidate; 
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findCandidateByEmail(email: string): Promise<ICandidate | null> {
        try {
            const candidate = await this.candidateModel.findOne({email: email});
            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCandidateData(userId: string, formData: CandidateCreateDto, fileName: string): Promise<ICandidate | null> {
        try {
            const updateData: Partial<ICandidate> = {
                name: formData.name,
                mobile: formData.mobile
            };
            
            if (fileName) {
                updateData.profileURL = fileName;
            }

            const candidate = await this.candidateModel.findOneAndUpdate(
                { _id: userId  }, 
                { $set: updateData },
                { new: true, upsert:true }
            );

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

    async getStack(): Promise<IStack[] | null> {
        try {
            const getStack = await this.stackModel.find();
            return getStack;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findInterviewer(interviewerId: string): Promise<IInterviewer | null> {
        try {
            const interviewer = await this.interviewerModel.findOne({_id: interviewerId});
            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
