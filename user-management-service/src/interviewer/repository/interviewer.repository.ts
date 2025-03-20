import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IInterviewerRepository } from "../interface/IInterviewerRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Interviewer, InterviewerDocument } from "../Model/interviewer.schema";
import { Model } from "mongoose";
import { IInterviewer } from "../interface/interface";
import { Stack } from "src/admin/Model/stack.schema";
import { Candidate } from "src/candidate/Model/candidate.schemas";
import { InterviewerDataDto, UpdateInterviewerDto } from "../dto/interviewer-data.dto";
import { StackResponseDto } from "../dto/stack-response.dto";
import { ICandidate } from "src/candidate/interface/interface";
import { BaseRepository } from "src/Repository/baseRepository";

@Injectable()
export class InterviewerRepository extends BaseRepository<Interviewer> implements IInterviewerRepository {
    constructor(
        @InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>,
        // @InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>,
        // @InjectModel(Stack.name) private readonly stackModel: Model<Stack>
    ) {
        super(interviewerModel);
    }

    async addDetails(formData: UpdateInterviewerDto, files: Express.Multer.File[]): Promise<InterviewerDataDto> {
        try {
            console.log(formData, 'this is formdata')
            // const updateInterviewerDetails = await this.update()
            const updateInterviewerDetails = await this.interviewerModel.findOneAndUpdate(
                { email: formData.email },
                {
                    $set: {
                        yearOfExperience: formData.yearOfExperience,
                        currentDesignation: formData.currentDesignation,
                        organization: formData.organization,
                        university: formData.university,
                        introduction: formData.introduction,
                        isDetails: true,
                        profileURL: files[0],
                        salarySlipURL: files[1],
                        resumeURL: files[2]
                    }
                }, { new: true, upsert: true })
            return updateInterviewerDetails;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async findInterviewerByEmail(email: string): Promise<InterviewerDataDto | null> {
    //     try {
    //         const interviewer = await this.findByEmail(email)
    //         // const interviewer = await this.interviewerModel.findOne({ email: email });
    //         return interviewer;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async findOne(userId: string): Promise<InterviewerDataDto | null> {
        try {
            const interviewer = await this.findOneById(userId);
            // const interviewer = await this.interviewerModel.findOne({ _id: userId }).exec();
            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateInterviewerData(userId: string, formData: UpdateInterviewerDto, fileName: string): Promise<UpdateInterviewerDto | null> {
        try {
            const updateData: Partial<UpdateInterviewerDto> = {
                name: formData.name,
                mobile: formData.mobile,
                currentDesignation: formData.currentDesignation,
                introduction: formData.introduction,
                yearOfExperience: formData.yearOfExperience,
                university: formData.university,
                organization: formData.organization
            };

            if (fileName) {
                updateData.profileURL = fileName;
            }

            const interviewer = await this.update(userId, updateData);

            // const interviewer = await this.interviewerModel.findOneAndUpdate(
            //     { _id: userId },
            //     { $set: updateData },
            //     { new: true, upsert: true }
            // );

            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePassword(userId: string, securePassword: string): Promise<InterviewerDataDto | null> {
        try {
            const updatedCandidate = await this.interviewerModel.findOneAndUpdate(
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

    // async fetchStack(): Promise<StackResponseDto[]> {
    //     try {
    //         const stack = await this.stackModel.find();
    //         console.log(stack, 'this is stack')
    //         return stack;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // async getCandidate(candidateId: string): Promise<ICandidate> {
    //     try {
    //         return await this.candidateModel.findOne({_id: candidateId});
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async sendInterviewer(data: any): Promise<InterviewerDataDto[]> {
        try {
            const interviewers = await this.interviewerModel.find({ _id: { $in: data.ids } }).exec();
            // console.log(interviewers, 'this is interviewer details to send booking service');
            return interviewers;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}