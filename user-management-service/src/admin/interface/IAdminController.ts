import { ICandidate, IStack } from "src/candidate/interface/interface";
import { IInterviewer } from "src/interviewer/interface/interface";

export interface IAdminController {
    getAllInterviewerApproval(page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; approvalData: { approvalData: IInterviewer[], totalRecords: number, totalPages: number, currentPage: number } }>;
    getApprovalDetails(id: string): Promise<{ success: boolean; message: string; approvalData: IInterviewer }>;
    approveDetails(id: string): Promise<{ success: boolean; message: string }>;
    getAllCandidates(page: number, limit: number, search: string): Promise<{ success: boolean; message: string; candidateData: { candidatesData: ICandidate[]; totalRecords: number, totalPages: number, currentPage: number } }>;
    getCandidateDetails(id: string): Promise<{ success: boolean; message: string; candidateData: ICandidate }>;
    candidateAction(id: string): Promise<{ success: boolean; message: string; candidateData: ICandidate }>;
    getAllInterviewers(page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; interviewerData: { interviewersData: IInterviewer[], totalRecords: number, totalPages: number, currentPage: number } }>;
    interviewerAction(id: string): Promise<{ success: boolean; message: string; interviewerData: IInterviewer }>;
    addStack(formData: any): Promise<{ success: boolean; message: string; stackData: IStack }>;
    stackList(): Promise<{ success: boolean; message: string; stackData: IStack[] }>;
    getInterviewDetails(ids: { candidateId: string, interviewerId: string }): Promise<{ success: boolean; message: string; interviewDetailsData: any }>
    getDashboard(): Promise<{ candidate: number, interviewer: number }>;
}