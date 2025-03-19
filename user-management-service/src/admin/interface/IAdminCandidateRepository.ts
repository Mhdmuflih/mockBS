import { ICandidate } from "src/candidate/interface/interface";

export interface IAdminCandidateRepository {
    getAllCandidate(): Promise<ICandidate[]>;
    getcandidateDetails(id: string): Promise<ICandidate>;
    candidateAction(id: string): Promise<ICandidate>;
}