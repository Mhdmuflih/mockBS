import { Request, Response } from "express";
import { ICandidateController } from "../Interface/Candidate/ICandidateController";
import { ICandidateService } from "../Interface/Candidate/ICandidateService";
import { HTTP_STATUS } from "../Constants/httpStatus";


export class CandidateControllers implements ICandidateController {
    constructor(private candidateService: ICandidateService) { }

    async googleAuth(req: Request, res: Response): Promise<void> {
        try {
            const { email, name, profileImage } = req.body;

            if (!email || !name) {
                res.status(400).json({
                    success: false,
                    message: "Google data is missing required fields.",
                });
                return;
            }

            const { accessToken, refreshToken, candidate } = await this.candidateService.googleAuth({
                name: name,
                email: email,
                profileImage: profileImage
            });

            res.status(200).json({
                success: true,
                message: "Verified",
                token: accessToken,
                refreshToken,
                candidateData: candidate,
            });
        } catch (error: any) {
            console.error("Error in Google Auth Controller:", error.message);
            res.status(409).json({ success: false, message: error.message });
        }
    }


    async signUpCanidate(req: Request, res: Response): Promise<void> {
        try {
            const { name, mobile, email, password } = req.body;

            if (!name || !mobile || !email || !password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "All fields are required." });
                return;
            }

            const candidate = await this.candidateService.createCandidate(name, mobile, email, password);
            console.log(candidate, "this is the candidate data");
            res.status(HTTP_STATUS.OK).json({ success: true, message: "OTP send successfully.", candidateData: candidate });

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

            const otpCandidateData: any = await this.candidateService.otpVerification(otp, email);

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
            const { email, context } = req.body;
            await this.candidateService.resendOtp(email, context);

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Resend OTP send Successfully." })
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            console.log(req.body, 'this is the forgot password body');
            const candidate = await this.candidateService.forgotPassword(email);
            res.status(HTTP_STATUS.OK).json({ success: true, message: "OTP send in your Email for forgot password", candidateData: candidate });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email, otp } = req.body;
            console.log(req.body, ' this is the verify email in forgot passoword controller');
            await this.candidateService.verifyEmail(email, otp);
            res.status(HTTP_STATUS.OK).json({ success: true, message: "OTP Verified To change Your Password" });


        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, confirmPassword } = req.body;
            console.log(req.body, 'this is the change password body data in controller');

            if (!email || !password || !confirmPassword) {
                res.status(400).json({ success: false, message: "Please provide email, password, and confirm password." });
                return;
            }

            await this.candidateService.changePassword(email, password, confirmPassword);

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Your password changed successfully." });
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

            const { accessToken, refreshToken, candidateDTO } = await this.candidateService.loginCandidate(email, password);

            

            console.log("successfully login in candidate");
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Login successfully completed.", token: accessToken, candidateData: candidateDTO, refreshToken: refreshToken });

        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async validateRefreshToken(req: Request, res: Response): Promise<any> {
        try {

            if (!req.body.refreshToken) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "Token not found" });
                return;
            }

            const { accessToken, refreshToken, candidateDTO } = await this.candidateService.validateRefreshToken(req.body.refreshToken);
            
            res.status(HTTP_STATUS.OK).json({ success: true, message: "token created", token: accessToken, refreshToken: refreshToken, candidateData: candidateDTO });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }


    async checkIsBlock(req: Request, res: Response): Promise<void> {
        try {
            console.log("23456789")
            const {userId} = req.params;
            console.log(userId,'this is blcok check user id');
            const data = await this.candidateService.checkIsBlock(userId);
            console.log(data, 'this is data')
            res.status(HTTP_STATUS.OK).json({success: true , message:"user check the data", data: data})
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