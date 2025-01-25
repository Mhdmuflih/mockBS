import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ICandidate } from 'src/candidate/Model/candidate.schema';
import { Model } from 'mongoose';
import { IInterviewer } from 'src/interviewer/Model/interviewer.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Candidate') private readonly candidateModel: Model<ICandidate>,
    @InjectModel('Interviewer') private readonly interviewerModel: Model<IInterviewer>, // Inject the model, not the schema

  ) { }

  async findAllApproval() {
    try {
      const approvalData = await this.interviewerModel.find({isApproved: false, isDetails: true}).exec();
      return { success: true, message: "interviewer Data.", approvalData: approvalData };
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async findOne(id: string) {
    try {
      const getApprovalDetails = await this.interviewerModel.findById({_id: id});
      return {success: true, message: "interviewerDetails", approvalData: getApprovalDetails};
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async approveDetails(id: string) {
    try {
      await this.interviewerModel.findByIdAndUpdate({_id: id}, {$set:{isApproved:true}});
      return {success: true, message: "interviewerDetails"};
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async getAllCandidate() {
    try {
      const candidatesData = await this.candidateModel.find().exec();
      return {success: true, message: "interviewerDetails", candidateData: candidatesData};
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  async getcandidateDetails(id: string) {
    try {
      const candidateDetails = await this.candidateModel.findById({_id: id});
      console.log(candidateDetails,'candidatedetauks');
      
      return {success: true, message: "interviewerDetails", candidateData: candidateDetails};
    } catch (error: any) {
      console.log(error.message);
      return { success: false, message: 'Failed to fetch candidate details!' };
    }
  }

  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  // findAll() {
  //   return `This action returns all admin`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} admin`;
  // }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} admin`;
  // }
}
