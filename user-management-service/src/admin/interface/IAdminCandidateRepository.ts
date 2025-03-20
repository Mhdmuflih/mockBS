import { ICandidate } from "src/candidate/interface/interface";

export interface IAdminCandidateRepository {
    getAllCandidate(page: number, limit: number, search?: string): Promise<{ total: number; data: ICandidate[] }>;
    getcandidateDetails(id: string): Promise<ICandidate>;
    candidateAction(id: string): Promise<ICandidate>;
}