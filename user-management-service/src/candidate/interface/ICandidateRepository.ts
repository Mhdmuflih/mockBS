import { ICandidate } from "./interface";


export interface ICandidateRepository {
    findOne(userId: string): Promise<ICandidate | null>;
    updateCandidateData(userId: string, formData: any, fileName: string): Promise<ICandidate | null>;
    updatePassword(userId: string, securePassword: string): Promise<ICandidate | null>
}
