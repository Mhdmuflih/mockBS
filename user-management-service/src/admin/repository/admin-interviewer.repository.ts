import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Interviewer } from "src/interviewer/Model/interviewer.schema";
import { BaseRepository } from "src/Repository/baseRepository";
import { IAdminInterviewerRepository } from "../interface/IAdminInterviewerRepository";
import { IInterviewer } from "src/interviewer/interface/interface";

@Injectable()
export class AdminInterviewerRepository extends BaseRepository<Interviewer> implements IAdminInterviewerRepository {
    constructor(@InjectModel(Interviewer.name) private readonly interviewerModel: Model<Interviewer>) {
        super(interviewerModel);
    }

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
}