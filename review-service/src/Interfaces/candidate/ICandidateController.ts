import { Request, Response } from "express"

export interface ICandidateController {
    fetchCandidateFeedback(req: Request, res: Response): Promise<void>
    addInterviewRating(req: Request, res: Response): Promise<any>
}