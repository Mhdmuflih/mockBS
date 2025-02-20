import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IInterviewerRepository } from "../interface/IInterviewerRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Interviewer } from "../Model/interviewer.schema";
import { Model } from "mongoose";
import { IInterviewer } from "../interface/interface";
import { Stack } from "src/admin/Model/stack.schema";

@Injectable()
export class InterviewerRepository implements IInterviewerRepository {
    constructor(
        @InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>,
        @InjectModel(Stack.name) private readonly stackModel: Model<Stack>
    ) { }

    async addDetails(formData: any, files: Express.Multer.File[]): Promise<any> {
        try {
            const updateInterviewerDetails = await this.interviewerModel.findOneAndUpdate(
                { email: formData.email },
                {
                    $set: {
                        yearOfExperience: formData.experience,
                        currentDesignation: formData.designation,
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

    async findInterviewerByEmail(email: string): Promise<any> {
        try {
            const interviewer = await this.interviewerModel.findOne({ email: email });
            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(userId: string): Promise<IInterviewer | null> {
        try {
            const interviewer = await this.interviewerModel.findOne({ _id: userId }).exec();
            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateInterviewerData(userId: string, formData: IInterviewer, fileName: string): Promise<IInterviewer | null> {
        try {
            const updateData: Partial<IInterviewer> = {
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

            const interviewer = await this.interviewerModel.findOneAndUpdate(
                { _id: userId },
                { $set: updateData },
                { new: true, upsert: true }
            );

            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePassword(userId: string, securePassword: string): Promise<any> {
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

    async fetchStack(): Promise<any> {
        try {
            const stack = await this.stackModel.find();
            // console.log(stack, 'this is stack')
            return stack;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async sendInterviewer(data: any): Promise<any> {
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