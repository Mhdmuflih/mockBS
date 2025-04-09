import { Model } from "mongoose";
import { ICandidateRepository } from "../Interfaces/candidate/ICandidateRepository";
import { Feedback, IFeedback } from "../Models/feedbackSchema";
import { BaseRepository } from "./baseRepository";

class CandidateRepository extends BaseRepository<IFeedback> implements ICandidateRepository {
    constructor() {
        super(Feedback)
    }

    async findTheFeedBackData(slotId: string, scheduledId: string): Promise<any> {
        try {
            return await Feedback.findOne({slotId: slotId, scheduledId: scheduledId}).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error create candidate feedback: ${error.message}`);
        }
    }
}

export default new CandidateRepository();