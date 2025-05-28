import { ICandidate, IStack } from "src/candidate/interface/interface";
import { IInterviewer } from "src/interviewer/interface/interface";

export interface IAdminRepository {
    addStack(formData: any): Promise<IStack>
    getAllStack(): Promise<IStack[]>;
}