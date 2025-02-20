export interface IAdminService {
    findAllApproval(): Promise<any>;
    findOne(id: string): Promise<any>;
    approveDetails(id: string): Promise<any>;
    getAllCandidate(): Promise<any>;
    getcandidateDetails(id: string): Promise<any>;
    candidateAction(id: string): Promise<any>;
    getAllInterviewers(): Promise<any>;
    interviewerAction(id: string): Promise<any>;
    addStack(formData: any): Promise<any>
    getAllStack(): Promise<any>;
}