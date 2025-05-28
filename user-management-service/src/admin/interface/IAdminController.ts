import { CandidateDTO } from "src/candidate/dtos/candidate-data.dto";
import { ICandidate, IStack } from "src/candidate/interface/interface";
import { InterviewerDTO } from "src/interviewer/dto/interviewer-data.dto";
import { StackDTO } from "src/interviewer/dto/stack-response.dto";
import { IInterviewer } from "src/interviewer/interface/interface";

export interface IAdminController {
    getAllInterviewerApproval(page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; approvalData: { approvalData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number } }>;
    getApprovalDetails(id: string): Promise<{ success: boolean; message: string; approvalData: InterviewerDTO }>;
    approveDetails(id: string): Promise<{ success: boolean; message: string }>;
    getAllCandidates(page: number, limit: number, search: string): Promise<{ success: boolean; message: string; candidateData: { candidatesData: CandidateDTO[]; totalRecords: number, totalPages: number, currentPage: number } }>;
    getCandidateDetails(id: string): Promise<{ success: boolean; message: string; candidateData: CandidateDTO }>;
    candidateAction(id: string): Promise<{ success: boolean; message: string; candidateData: CandidateDTO }>;
    getAllInterviewers(page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; interviewerData: { interviewersData: InterviewerDTO[], totalRecords: number, totalPages: number, currentPage: number } }>;
    interviewerAction(id: string): Promise<{ success: boolean; message: string; interviewerData: InterviewerDTO }>;
    addStack(formData: any): Promise<{ success: boolean; message: string; stackData: StackDTO }>;
    stackList(): Promise<{ success: boolean; message: string; stackData: StackDTO[] }>;
    getInterviewDetails(ids: { candidateId: string, interviewerId: string }): Promise<{ success: boolean; message: string; interviewDetailsData: any }>
    getDashboard(): Promise<{ success: boolean, message: string, candidate: number, premiumCandidates: number, interviewer: number, unApprovedInterviewer: number }>;
}