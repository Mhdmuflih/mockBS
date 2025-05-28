import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IInterviewerRepository } from "../interface/IInterviewerRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Interviewer, InterviewerDocument } from "../Model/interviewer.schema";
import { Model } from "mongoose";
import { BaseRepository } from "src/Repository/baseRepository";
import { IInterviewer } from "../interface/interface";

@Injectable()
export class InterviewerRepository extends BaseRepository<Interviewer> implements IInterviewerRepository {
    constructor(
        @InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>,
    ) {
        super(interviewerModel);
    }

    async addDetails(formData: any, files: Express.Multer.File[]): Promise<IInterviewer> {
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

    async updateInterviewerData(userId: string, formData: any, fileName: string): Promise<IInterviewer | null> {
        try {
            const updateData: Partial<any> = {
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

    async updatePassword(userId: string, securePassword: string): Promise<IInterviewer | null> {
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

    async sendInterviewer(data: any): Promise<IInterviewer[]> {
        try {
            const interviewers = await this.interviewerModel.find({ _id: { $in: data.ids } }).exec();
            return interviewers;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}