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

    async findAllApproval(page: number, limit: number, search?: string): Promise<{total: number, data: IInterviewer[]}> {
        try {
            let filter = { isApproved: false, isDetails: true };
            const approvalData = await this.findWithPagination(filter, page, limit, search)
            return approvalData;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(id: string): Promise<IInterviewer> {
        try {
            const getApprovalDetails = await this.findOneById(id);
            // const getApprovalDetails = await this.interviewerModel.findById({ _id: id });
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


      async getAllInterviewers(page: number, limit: number, search?: string): Promise<{total: number, data: IInterviewer[]}> {
            try {

                const filter = { isApproved: true }

                const interviewersData = await this.findWithPagination(filter, page, limit, search)

                // const interviewersData = await this.interviewerModel.find({ isApproved: true }).exec();
                return interviewersData;
            } catch (error: any) {
                console.log(error.message)
                throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    
        async interviewerAction(id: string): Promise<IInterviewer> {
            try {
                const interviewer = await this.findOneById(id);
                // const interviewer = await this.interviewerModel.findOne({ _id: id });
    
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