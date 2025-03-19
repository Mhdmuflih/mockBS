import { ICandidate, IStack } from "src/candidate/interface/interface";
import { IInterviewer } from "src/interviewer/interface/interface";

export interface IAdminRepository {
    // findAllApproval(skip: number , limit: number, search?: string): Promise<any>;
    // countApproval(search?: string): Promise<number>;
    // findOne(id: string): Promise<IInterviewer>;
    // approveDetails(id: string): Promise<IInterviewer>;
    // getAllCandidate(): Promise<ICandidate[]>;
    // getcandidateDetails(id: string): Promise<ICandidate>;
    // candidateAction(id: string): Promise<ICandidate>;
    // getAllInterviewers(): Promise<IInterviewer[]>;
    // interviewerAction(id: string): Promise<IInterviewer>;
    addStack(formData: any): Promise<IStack>
    getAllStack(): Promise<IStack[]>;
}