import { IInterviewer } from "src/interviewer/interface/interface";

export interface ICandidateInterviewerRepository {
    findInterviewer(interviewerId: string): Promise<IInterviewer | null>;
}