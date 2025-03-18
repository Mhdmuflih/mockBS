import { ICandidate, IStack } from "src/candidate/interface/interface";
import { IInterviewer } from "src/interviewer/interface/interface";

export interface IAdminController {
    getAllInterviewerApproval(page: number, limit: number, search?: string): Promise<{ success: boolean; message: string; approvalData: IInterviewer }>;
    getApprovalDetails(id: string): Promise<{ success: boolean; message: string; approvalData: IInterviewer }>;
    approveDetails(id: string): Promise<{ success: boolean; message: string }>;
    getAllCandidates(): Promise<{ success: boolean; message: string; candidateData: ICandidate[] }>;
    getCandidateDetails(id: string): Promise<{ success: boolean; message: string; candidateData: ICandidate }>;
    candidateAction(id: string): Promise<{ success: boolean; message: string; candidateData: ICandidate }>;
    getAllInterviewers(): Promise<{ success: boolean; message: string; interviewerData: IInterviewer[] }>;
    interviewerAction(id: string): Promise<{ success: boolean; message: string; interviewerData: IInterviewer }>;
    addStack(formData: any): Promise<{ success: boolean; message: string; stackData: IStack }>;
    stackList(): Promise<{ success: boolean; message: string; stackData: IStack[] }>;
    getInterviewDetails(ids: { candidateId: string, interviewerId: string }): Promise<{ success: boolean; message: string; interviewDetailsData: any }>
}