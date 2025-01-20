import { Request, Response } from "express";
import { ICandidateController } from "../Interface/Candidate/ICandidateController";
import { ICandidateService } from "../Interface/Candidate/ICandidateService";
import { HTTP_STATUS } from "../Constants/httpStatus";


export class CandidateControllers implements ICandidateController {
    constructor(private candidateService: ICandidateService) { }

    async signUpCanidate(req: Request, res: Response): Promise<void> {
        try {
            const { name, mobile, email, password } = req.body;

            if (!name || !mobile || !email || !password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "All fields are required." });
                return;
            }

            const candidate = await this.candidateService.createCandidate(name, mobile, email, password);
            console.log(candidate, "this is the candidate data");
            res.status(HTTP_STATUS.OK).json({ success: true, message: "OTP sent successfully.", candidateData: candidate });

        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async otpVerification(req: Request, res: Response): Promise<void> {
        try {
            const { otp, email } = req.body;
            console.log(otp, email, " this is the email and otp controller")

            if (!otp || !email) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "OTP and email are required." });
                return;
            }

            const otpCandidateData: any = await this.candidateService.otpVerification(parseInt(otp), email);

            if (!otpCandidateData) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: otpCandidateData.message });
                return
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "OTP verified successfully." });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }


    async resendOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            await this.candidateService.resendOtp(email);

            res.status(HTTP_STATUS.OK).json({success: true, message: "Resend OTP send Successfully."})
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }


    async loginCandidate(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log(req.body, "this is the body data in login controller");
            if (!email || !password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email and password are required." });
                return
            }

            const { accessToken, refreshToken, candidate } = await this.candidateService.loginCandidate(email, password);

            // res.cookie("refreshToken", refreshToken, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     maxAge: 10 * 1000
            // });

            console.log("successfully login in candidate");
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Login successfully completed.", token: accessToken, candidateData: candidate });

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