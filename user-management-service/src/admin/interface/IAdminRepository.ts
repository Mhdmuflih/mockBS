export interface IAdminRepository {
    findAllApproval(skip: number , limit: number, search?: string): Promise<any>;
    countApproval(search?: string): Promise<number>;
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