import { ICandidate, IStack } from "src/candidate/interface/interface";
import { IInterviewer } from "src/interviewer/interface/interface";

export interface IAdminService {
    findAllApproval(page: number, limit: number, search: string): Promise<any>;
    findOne(id: string): Promise<IInterviewer>;
    approveDetails(id: string): Promise<IInterviewer>;
    getAllCandidate(page: number, limit: number, search: string): Promise<{candidatesData: ICandidate[]; totalRecords: number, totalPages: number, currentPage: number}>;
    getcandidateDetails(id: string): Promise<ICandidate>;
    candidateAction(id: string): Promise<ICandidate>;
    getAllInterviewers(page: number, limit: number, search: string): Promise<{ interviewersData: IInterviewer[], totalRecords: number, totalPages: number, currentPage: number }>;
    interviewerAction(id: string): Promise<IInterviewer>;
    addStack(formData: any): Promise<IStack>
    getAllStack(): Promise<IStack[]>;
}