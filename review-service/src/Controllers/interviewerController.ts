import { Request, Response } from "express";
import { IInterviewerController } from "../Interfaces/interviewer/IInterviewerController";
import { IInterviewerService } from "../Interfaces/interviewer/IInterviewerSerivce";
import { HTTP_STATUS } from "../Constants/httpStatus";

export class InterviewerControllers implements IInterviewerController {
    constructor(private readonly interviewerService: IInterviewerService) { }

    async addFeedback(req: Request, res: Response): Promise<void> {
        try {
            const interviewerId: unknown = req.headers['x-user-id'];
            await this.interviewerService.addFeedback(interviewerId as string, req.body);
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Interviewer add candidate feedback" });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }
    async viewReviewRating(req: Request, res: Response): Promise<void> {
        try {
            const { slotId, scheduledId } = req.query
            const interviewerId: unknown = req.headers['x-user-id'];
            const reviewRating = await this.interviewerService.viewReviewRating(interviewerId as string, slotId as string, scheduledId as string );
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Interviewer view interview rating", reviewRating: reviewRating });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }
}