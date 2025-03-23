import { IInterviewer } from "src/interviewer/interface/interface";

export interface IAdminInterviewerRepository {
    approveDetails(id: string): Promise<IInterviewer>
    interviewerAction(id: string): Promise<IInterviewer>

}