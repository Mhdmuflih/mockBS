import { Request, Response } from "express";

export interface ICandidateController {
    signUpCanidate(req: Request, res: Response): Promise<void>;
    otpVerification(req: Request, res: Response): Promise<void>;
    resendOtp(req: Request, res: Response): Promise<void>;
    loginCandidate(req: Request, res: Response): Promise<void>;
}