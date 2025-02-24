export interface IAdminController {
    getAllInterviewerApproval(page: number, limit: number, search?: string): Promise<any>;
    getApprovalDetails(id: string): Promise<any>;
    approveDetails(id: string): Promise<any>;
    getAllCandidates(): Promise<any>;
    getCandidateDetails(id: string): Promise<any>;
    candidateAction(id: string): Promise<any>;
    getAllInterviewers(): Promise<any>;
    interviewerAction(id: string): Promise<any>;
    addStack(formData: any): Promise<any>;
    stackList(): Promise<any>;
}