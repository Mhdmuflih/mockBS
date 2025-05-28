import { CandidateDTO } from "src/candidate/dtos/candidate-data.dto";
import { InterviewerDTO } from "src/interviewer/dto/interviewer-data.dto";
import { StackDTO } from "src/interviewer/dto/stack-response.dto";

export interface IAdminService {
    findAllApproval(page: number, limit: number, search: string): Promise<{ approvalData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number }>;
    findOne(id: string): Promise<InterviewerDTO>;
    approveDetails(id: string): Promise<InterviewerDTO>;
    getAllCandidate(page: number, limit: number, search: string): Promise<{ candidatesData: CandidateDTO[]; totalRecords: number, totalPages: number, currentPage: number }>;
    getcandidateDetails(id: string): Promise<CandidateDTO>;
    candidateAction(id: string): Promise<CandidateDTO>;
    getAllInterviewers(page: number, limit: number, search: string): Promise<{ interviewersData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number }>;
    interviewerAction(id: string): Promise<InterviewerDTO>;
    addStack(formData: any): Promise<StackDTO>
    getAllStack(): Promise<StackDTO[]>;
    getDashboradData(): Promise<{ candidate: number, interviewer: number,unApprovedInterviewer: number }>;
}