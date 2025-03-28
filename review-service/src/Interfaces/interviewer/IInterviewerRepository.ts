import { IFeedback } from "../../Models/feedbackSchema";

export interface IInterviewerRepository {
    createFeedback(feedbackData: IFeedback): Promise<IFeedback>;
    findOneData(slotId: string, candidateId: string): Promise<any>
}