import { IInterviewerRepository } from "../Interfaces/interviewer/IInterviewerRepository";
import { Feedback, IFeedback } from "../Models/feedbackSchema";
import { BaseRepository } from "./baseRepository";

class InterviewerRepository extends BaseRepository<IFeedback> implements IInterviewerRepository {
    constructor() {
        super(Feedback)
    }

    async createFeedback(feedbackData: IFeedback): Promise<IFeedback> {
        try {
            const feedback = new Feedback(feedbackData);
            const data =  await feedback.save(); 
            console.log(data, 'this is saved data');
            return data;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error create candidate feedback: ${error.message}`);
        }
    }

    async findOneData(slotId: string, candidateId: string): Promise<any> {
        try {
            return Feedback.findOne({slotId: slotId, candidateId: candidateId}).exec();
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error create candidate feedback: ${error.message}`);
        }
    }

}

export default new InterviewerRepository();