import { Request, Response } from "express";

export interface IInterviewerController {
     addFeedback(req: Request, res: Response): Promise<void> 
    }