import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
// import { ICandidate } from 'src/candidate/Model/candidate.schema';
import { Model } from 'mongoose';
// import { IInterviewer } from 'src/interviewer/Model/interviewer.schema';
import { ICandidate } from 'src/candidate/interface/interface';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { Stack } from './Model/stack.schema';
import { Mode } from 'fs';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<ICandidate>,
    @InjectModel('Interviewer') private readonly interviewerModel: Model<IInterviewer>,
    @InjectModel(Stack.name) private readonly stackModel: Model<Stack>
  ) { }

  async findAllApproval() {
    try {
      const approvalData = await this.interviewerModel.find({ isApproved: false, isDetails: true }).exec();
      return { success: true, message: "interviewer Data.", approvalData: approvalData };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async findOne(id: string) {
    try {
      const getApprovalDetails = await this.interviewerModel.findById({ _id: id });
      return { success: true, message: "interviewerDetails", approvalData: getApprovalDetails };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async approveDetails(id: string) {
    try {
      await this.interviewerModel.findByIdAndUpdate({ _id: id }, { $set: { isApproved: true } });
      return { success: true, message: "interviewerDetails" };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async getAllCandidate() {
    try {
      const candidatesData = await this.candidateModel.find().exec();
      return { success: true, message: "interviewerDetails", candidateData: candidatesData };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async getcandidateDetails(id: string) {
    try {
      const candidateDetails = await this.candidateModel.findById({ _id: id });
      return { success: true, message: "interviewerDetails", candidateData: candidateDetails };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async candidateAction(id: string) {
    try {
      const candidate = await this.candidateModel.findOne({ _id: id });

      if (!candidate) {
        return { success: false, message: "Candidate not found!" };
      }

      const updatedCandidate = await this.candidateModel.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: !candidate.isBlocked } },
        { new: true }
      );
  
      return { success: true, message: "Candidate status updated successfully!", candidateData: updatedCandidate };

    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate action!' };
    }
  }

  async getAllInterviewers() {
    try {
      const candidatesData = await this.interviewerModel.find({isApproved:true}).exec();
      return { success: true, message: "interviewerDetails", interviewerData: candidatesData };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch Interviewer details!' };
    }
  }

  async interviewerAction(id: string) {
    try {
      const interviewer = await this.interviewerModel.findOne({ _id: id });

      if (!interviewer) {
        return { success: false, message: "Interviewer not found!" };
      }

      const updatedInterviewer = await this.interviewerModel.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: !interviewer.isBlocked } },
        { new: true }
      );
  
      return { success: true, message: "Interviewer status updated successfully!", interviewerData: updatedInterviewer };

    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch Interviewer action!' };
    }
  }
  
  async addStack(formData: any) {
    try {
      const stack = new this.stackModel(formData);
      const saveStack = await stack.save();
      return { success: true, message: 'Stack added successfully!', stackData: saveStack };
    } catch (error: any) {
      return { success: false, message: 'Failed to add stack!' };
    }
  }
}
