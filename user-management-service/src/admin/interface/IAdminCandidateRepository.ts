import { ICandidate } from "src/candidate/interface/interface";

export interface IAdminCandidateRepository {
    candidateAction(id: string): Promise<ICandidate>;
    findCandidateCount(): Promise<number>;
}