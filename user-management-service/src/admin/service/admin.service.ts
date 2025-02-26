import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAdminService } from '../interface/IAdminService';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly adminRepository: AdminRepository
  ) { }

  async findAllApproval(page: number, limit: number, search?: string): Promise<any> {
    try {
      console.log(search, 'this is the search')

      // if (search) {
      //   const approvalData = await this.adminRepository.findAllApproval(0, 0, search);
      //   return approvalData;
      // }

      const skip = (page - 1) * limit;
      const approvalData = await this.adminRepository.findAllApproval(skip, limit, search);
      const totalRecords = await this.adminRepository.countApproval(search);

      return {
        approvalData,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const getApprovalDetails = await this.adminRepository.findOne(id);
      return getApprovalDetails
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async approveDetails(id: string): Promise<any> {
    try {
      return await this.adminRepository.approveDetails(id);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllCandidate(): Promise<any> {
    try {
      const candidatesData = await this.adminRepository.getAllCandidate();
      return candidatesData;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getcandidateDetails(id: string): Promise<any> {
    try {
      const candidateDetails = await this.adminRepository.getcandidateDetails(id);
      return candidateDetails;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async candidateAction(id: string): Promise<any> {
    try {

      const updatedCandidate = await this.adminRepository.candidateAction(id);

      return updatedCandidate;

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllInterviewers(): Promise<any> {
    try {
      const interviewersData = await this.adminRepository.getAllInterviewers();
      return interviewersData;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async interviewerAction(id: string): Promise<any> {
    try {

      const updatedInterviewer = await this.adminRepository.interviewerAction(id);

      return updatedInterviewer;

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addStack(formData: any): Promise<any> {
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

  async getAllStack(): Promise<any> {
    try {
      const stack = await this.adminRepository.getAllStack();
      return stack;
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getInterviewsDetailsData(ids: {candidateId: string, interviewerId: string}): Promise<any> {
    try {
      // console.log(ids, "this is for the service in admin")
      const interviewerDetails = await this.adminRepository.findOne(ids.interviewerId);
      const candidateDetails = await this.adminRepository.getcandidateDetails(ids.candidateId);
      
      // console.log(interviewerDetails, candidateDetails, 'this is for the interviewer and candidate data');
      return [interviewerDetails, candidateDetails]
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
