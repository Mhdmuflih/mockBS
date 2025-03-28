import { ICandidateRepository } from "../Interfaces/candidate/ICandidateRepository";
import { ICandidateService } from "../Interfaces/candidate/ICandidateService";

export class CandidateService implements ICandidateService {
    constructor(private readonly candidateRepository: ICandidateRepository) { }

    async fetchCandidateFeedback(slotId: string, scheduledId: string): Promise<any> {
        try {
            return await this.candidateRepository.findTheFeedBackData(slotId, scheduledId);
        } catch (error: any) {
            console.log("Error creating candidate feedback:", error.message);
            throw new Error(`Error creating candidate feedback: ${error.message}`);
        }
    }
}