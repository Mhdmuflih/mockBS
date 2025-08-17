import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IAdminService } from '../interface/IAdminService';
import { AdminRepository } from '../repository/admin.repository';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { ICandidate, IStack } from 'src/candidate/interface/interface';
import { AdminCandidateRepository } from '../repository/admin-candidate.repository';
import { AdminInterviewerRepository } from '../repository/admin-interviewer.repository';
import { InterviewerDTO } from 'src/interviewer/dto/interviewer-data.dto';
import { CandidateDTO } from 'src/candidate/dtos/candidate-data.dto';
import { StackDTO } from 'src/interviewer/dto/stack-response.dto';

@Injectable()
export class AdminService implements IAdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly adminCandidateRepository: AdminCandidateRepository,
    private readonly adminInterviewerRepository: AdminInterviewerRepository
  ) { }

  async findAllApproval(page: number, limit: number, search?: string): Promise<{ approvalData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number }> {
    try {
      const approvalData = await this.adminInterviewerRepository.findWithPagination({ isApproved: false, isDetails: true }, page, limit, search)
      const interivewes: InterviewerDTO[] = InterviewerDTO.fromList(approvalData.data);
      return {
        approvalData: interivewes,
        totalRecords: approvalData.total,
        totalPages: Math.ceil(approvalData.total / limit),
        currentPage: page,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<InterviewerDTO> {
    try {
      const getApprovalDetails: IInterviewer = await this.adminInterviewerRepository.findOneById(id);
      if (!getApprovalDetails) {
        throw new NotFoundException(`Interviewer with id ${id} not found`);
      }
      return InterviewerDTO.from(getApprovalDetails);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async approveDetails(id: string): Promise<InterviewerDTO> {
    try {
      const data = await this.adminInterviewerRepository.approveDetails(id);
      if (!data) {
        throw new NotFoundException(`Interviewer with id ${id} not found`);
      }
      return InterviewerDTO.from(data);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllCandidate(page: number, limit: number, search: string): Promise<{ candidatesData: CandidateDTO[]; totalRecords: number, totalPages: number, currentPage: number }> {
    try {
      const candidatesData = await this.adminCandidateRepository.findWithPagination({}, page, limit, search);
      const candidates: CandidateDTO[] = CandidateDTO.formList(candidatesData.data)
      return {
        candidatesData: candidates,
        totalRecords: candidatesData.total,
        totalPages: Math.ceil(candidatesData.total / limit),
        currentPage: page,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getcandidateDetails(id: string): Promise<CandidateDTO> {
    try {
      const candidateDetails: ICandidate = await this.adminCandidateRepository.findOneById(id);
      return CandidateDTO.from(candidateDetails);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async candidateAction(id: string): Promise<CandidateDTO> {
    try {
      const updatedCandidate: ICandidate = await this.adminCandidateRepository.candidateAction(id);
      return CandidateDTO.from(updatedCandidate);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllInterviewers(page: number, limit: number, search?: string): Promise<{ interviewersData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number }> {
    try {
      const interviewersData = await this.adminInterviewerRepository.findWithPagination({ isApproved: true }, page, limit, search);
      const interviewers: InterviewerDTO[] = InterviewerDTO.fromList(interviewersData.data);
      return {
        interviewersData: interviewers,
        totalRecords: interviewersData.total,
        totalPages: Math.ceil(interviewersData.total / limit),
        currentPage: page,
      }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async interviewerAction(id: string): Promise<InterviewerDTO> {
    try {

      const updatedInterviewer = await this.adminInterviewerRepository.interviewerAction(id);

      return InterviewerDTO.from(updatedInterviewer);

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addStack(formData: any): Promise<StackDTO> {
    try {
      const saveStack = await this.adminRepository.addStack(formData);
      return StackDTO.from(saveStack);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateStack(formData: any): Promise<StackDTO> {
    try {
      const updatedStack = await this.adminRepository.updateStack(formData);
      return StackDTO.from(updatedStack);
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getAllStack(): Promise<StackDTO[]> {
    try {
      const stack: IStack[] = await this.adminRepository.getAllStack();
      return StackDTO.fromList(stack);
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


  async getDashboradData(): Promise<{ candidate: number, premiumCandidates: number, interviewer: number, unApprovedInterviewer: number }> {
    try {
      const candidate = await this.adminCandidateRepository.findCandidateCount();
      const premiumCandidates = await this.adminCandidateRepository.findPremiumCandidateCount();
      const interviewer = await this.adminInterviewerRepository.findInterviewerCount();
      const unApprovedInterviewer = await this.adminInterviewerRepository.findUnApprovedInterviewer();
      return { candidate, premiumCandidates, interviewer, unApprovedInterviewer };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
