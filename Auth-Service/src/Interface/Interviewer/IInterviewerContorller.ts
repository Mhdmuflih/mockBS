import { Request, Response } from "express";

export interface IInterviewerController {
    signUpInterviewer(req: Request, res: Response): Promise<void>;
    otpVerification(req: Request, res: Response): Promise<void>;
    resendOtp(req: Request, res: Response): Promise<void>;
    forgotPassword(req: Request, res: Response): Promise<void>;
    verifyEmail(req: Request, res: Response): Promise<void>;
    changePassword(req: Request, res: Response): Promise<void>;
    loginInterviewer(req: Request, res: Response): Promise<void>;

    validateRefreshToken(req: Request, res: Response): Promise<void>

    checkIsBlock(req: Request, res: Response): Promise<void>
    
    // addDetails(req: Request, res: Response): Promise<void>;
    // login(req: Request, res: Response): Promise<void>;
}