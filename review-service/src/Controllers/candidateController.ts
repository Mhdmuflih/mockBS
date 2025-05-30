import { Request, Response } from "express";
import { ICandidateController } from "../Interfaces/candidate/ICandidateController";
import { ICandidateService } from "../Interfaces/candidate/ICandidateService";
import { HTTP_STATUS } from "../Constants/httpStatus";

export class CandidateController implements ICandidateController {
    constructor(private readonly candidateService: ICandidateService) { }

    async fetchCandidateFeedback(req: Request, res: Response): Promise<void> {
        try {
            const { slotId, scheduledId } = req.query as { slotId: string; scheduledId: string };
            const feedbackData = await this.candidateService.fetchCandidateFeedback(slotId, scheduledId);
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Interviewer add candidate feedback", feedbackData: feedbackData });

        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                if (error instanceof Error) {
                    res.status(409).json({ message: error.message });
                } else {
                    console.log(error.message);
                    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
                }
            }
        }
    }

    async addInterviewRating(req: Request, res: Response): Promise<void> {
        try {
            const {interviewerId, scheduledId, slotId,  ratings, comment} = req.body;
            const candidateId = req.headers['x-user-id'];
            const data = await this.candidateService.addInterviewRating(candidateId, interviewerId, scheduledId, slotId, ratings, comment);
            console.log(data, 'this is the rating data of the controller last');
            res.status(HTTP_STATUS.OK).json({ success: true, message: "added the interview rating" });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                if (error instanceof Error) {
                    res.status(409).json({ message: error.message });
                } else {
                    console.log(error.message);
                    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
                }
            }
        }
    }
}