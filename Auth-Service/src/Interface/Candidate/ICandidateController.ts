import { Request, Response } from "express";

export interface ICandidateController {
    googleAuth(req: Request, res: Response): Promise<void>;
    signUpCanidate(req: Request, res: Response): Promise<void>;
    otpVerification(req: Request, res: Response): Promise<void>;
    resendOtp(req: Request, res: Response): Promise<void>;
    forgotPassword(req: Request, res: Response): Promise<void>;
    verifyEmail(req: Request, res: Response): Promise<void>;
    changePassword(req: Request, res: Response): Promise<void>;
    loginCandidate(req: Request, res: Response): Promise<void>;
}