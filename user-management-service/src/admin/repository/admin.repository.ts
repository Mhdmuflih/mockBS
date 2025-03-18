import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICandidate, IStack } from "src/candidate/interface/interface";
import { IInterviewer } from "src/interviewer/interface/interface";
import { Stack } from "../Model/stack.schema";
import { IAdminRepository } from "../interface/IAdminRepository";

@Injectable()
export class AdminRepository implements IAdminRepository {
    constructor(
        @InjectModel('Candidate') private readonly candidateModel: Model<ICandidate>,
        @InjectModel('Interviewer') private readonly interviewerModel: Model<IInterviewer>,
        @InjectModel(Stack.name) private readonly stackModel: Model<Stack>
    ) { }

    async findAllApproval(skip: number, limit: number, search?: string): Promise<any> {
        try {
            let filter: any = { isApproved: false, isDetails: true };

            // Apply search filter if search term is provided
            if (search) {
                filter.$or = [
                    { name: { $regex:   search , $options: "i" } },
                    { email: { $regex:   search ,  $options: "i" } },
                    { mobile: { $regex:   search ,  $options: "i" } },
                ];
            }

            // if (search) {
            //     return await this.interviewerModel.find(filter).exec();
            // }

            const approvalData = await this.interviewerModel.find(filter)
                .skip(skip)
                .limit(limit)
                .exec();

            return approvalData;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async countApproval(search?: string): Promise<number> {
        try {
            let filter: any = { isApproved: false, isDetails: true };

            if (search) {
                filter.$or = [
                    { name: { $regex:  search , $options: "i" } },
                    { email: { $regex: search , $options: "i" } },
                    { mobile: { $regex:  search , $options: "i" } },
                ];
            }

            return await this.interviewerModel.countDocuments(filter).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: string): Promise<IInterviewer> {
        try {
            const getApprovalDetails = await this.interviewerModel.findById({ _id: id });
            return getApprovalDetails
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async approveDetails(id: string): Promise<IInterviewer> {
        try {
            return await this.interviewerModel.findByIdAndUpdate({ _id: id }, { $set: { isApproved: true } });
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllCandidate(): Promise<ICandidate[]> {
        try {
            const candidatesData = await this.candidateModel.find().exec();
            return candidatesData;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getcandidateDetails(id: string): Promise<ICandidate> {
        try {
            const candidateDetails = await this.candidateModel.findById({ _id: id });
            return candidateDetails;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async candidateAction(id: string): Promise<ICandidate> {
        try {
            const candidate = await this.candidateModel.findOne({ _id: id });

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

    async getAllInterviewers(): Promise<IInterviewer[]> {
        try {
            const interviewersData = await this.interviewerModel.find({ isApproved: true }).exec();
            return interviewersData;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async interviewerAction(id: string): Promise<IInterviewer> {
        try {
            const interviewer = await this.interviewerModel.findOne({ _id: id });

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

    async addStack(formData: any): Promise<IStack> {
        try {
            const existingStack = await this.stackModel.findOne({ stackName: formData.stackName });
            if (existingStack) {
                throw new BadRequestException('This stack Name is already existing.');
            }

            const stack = new this.stackModel(formData);
            return await stack.save();
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllStack(): Promise<IStack[]> {
        try {
            const stack = await this.stackModel.find().exec();
            return stack;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}