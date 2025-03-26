import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAdminService } from '../interface/IAdminService';
import { AdminRepository } from '../repository/admin.repository';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { ICandidate, IStack } from 'src/candidate/interface/interface';
import { AdminCandidateRepository } from '../repository/admin-candidate.repository';
import { AdminInterviewerRepository } from '../repository/admin-interviewer.repository';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly adminCandidateRepository: AdminCandidateRepository,
    private readonly adminInterviewerRepository: AdminInterviewerRepository
  ) { }

  async findAllApproval(page: number, limit: number, search?: string): Promise<{ approvalData: IInterviewer[], totalRecords: number, totalPages: number, currentPage: number }> {
    try {
      // const approvalData = await this.adminInterviewerRepository.findAllApproval(page, limit, search);
      const approvalData = await this.adminInterviewerRepository.findWithPagination({ isApproved: false, isDetails: true }, page, limit, search)
      return {
        approvalData: approvalData.data,
        totalRecords: approvalData.total,
        totalPages: Math.ceil(approvalData.total / limit),
        currentPage: page,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<IInterviewer> {
    try {
      // const getApprovalDetails = await this.adminInterviewerRepository.findOne(id);
      const getApprovalDetails = await this.adminInterviewerRepository.findOneById(id);
      return getApprovalDetails
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async approveDetails(id: string): Promise<IInterviewer> {
    try {
      return await this.adminInterviewerRepository.approveDetails(id);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllCandidate(page: number, limit: number, search: string): Promise<{candidatesData: ICandidate[]; totalRecords: number, totalPages: number, currentPage: number}> {
    try {
      const candidatesData = await this.adminCandidateRepository.findWithPagination({}, page, limit, search);
      // const candidatesData = await this.adminCandidateRepository.getAllCandidate(page, limit, search);
      return {
        candidatesData: candidatesData.data,
        totalRecords: candidatesData.total,
        totalPages: Math.ceil(candidatesData.total / limit),
        currentPage: page,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getcandidateDetails(id: string): Promise<ICandidate> {
    try {
      // const candidateDetails = await this.adminRepository.getcandidateDetails(id);
      // const candidateDetails = await this.adminCandidateRepository.getcandidateDetails(id);
      const candidateDetails = await this.adminCandidateRepository.findOneById(id);
      return candidateDetails;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async candidateAction(id: string): Promise<ICandidate> {
    try {

      // const updatedCandidate = await this.adminRepository.candidateAction(id);
      const updatedCandidate = await this.adminCandidateRepository.candidateAction(id);

      return updatedCandidate;

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllInterviewers(page: number, limit: number, search?: string): Promise<{ interviewersData: IInterviewer[], totalRecords: number, totalPages: number, currentPage: number }> {
    try {
      // const interviewersData = await this.adminInterviewerRepository.getAllInterviewers(page, limit, search);
      const interviewersData = await this.adminInterviewerRepository.findWithPagination({ isApproved: true }, page, limit, search);
      return {
        interviewersData: interviewersData.data,
        totalRecords: interviewersData.total,
        totalPages: Math.ceil(interviewersData.total / limit),
        currentPage: page,
      }
      // return interviewersData;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async interviewerAction(id: string): Promise<IInterviewer> {
    try {

      const updatedInterviewer = await this.adminInterviewerRepository.interviewerAction(id);

      return updatedInterviewer;

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addStack(formData: any): Promise<IStack> {
    try {

      // const existingStack = await this.stackModel.find({ stackName: formData.stackName });
      // if (existingStack) {
      //   throw new BadRequestException('This stack Name is already existing.');
      // }

      const saveStack = await this.adminRepository.addStack(formData);
      // const saveStack = await stack.save();
      return saveStack;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllStack(): Promise<IStack[]> {
    try {
      const stack = await this.adminRepository.getAllStack();
      return stack;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInterviewsDetailsData(ids: { candidateId: string, interviewerId: string }): Promise<[IInterviewer, ICandidate]> {
    try {
      // console.log(ids, "this is for the service in admin")
      // const interviewerDetails = await this.adminInterviewerRepository.findOne(ids.interviewerId);
      const interviewerDetails = await this.adminInterviewerRepository.findOneById(ids.interviewerId);
      // const candidateDetails = await this.adminRepository.getcandidateDetails(ids.candidateId);
      // const candidateDetails = await this.adminCandidateRepository.getcandidateDetails(ids.candidateId);
      const candidateDetails = await this.adminCandidateRepository.findOneById(ids.candidateId);

      // console.log(interviewerDetails, candidateDetails, 'this is for the interviewer and candidate data');
      return [interviewerDetails, candidateDetails]
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getDashboradData(): Promise<{candidate:number, interviewer:number}> {
    try {
      const candidate = await this.adminCandidateRepository.findCandidateCount();
      const interviewer = await this.adminInterviewerRepository.findInterviewerCount();
      return {candidate, interviewer};
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
