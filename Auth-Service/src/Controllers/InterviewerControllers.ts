import { Request, Response } from "express";
import { IInterviewerController } from "../Interface/Interviewer/IInterviewerContorller";
import { IInterviewerService } from "../Interface/Interviewer/IInterviewerService";
import { HTTP_STATUS } from "../Constants/httpStatus";

export class InterviewerControllers implements IInterviewerController {
    constructor(private interviewerService: IInterviewerService) { }

    async signUpInterviewer(req: Request, res: Response): Promise<void> {
        try {
            const { name, mobile, email, password } = req.body;

            if (!name || !mobile || !email || !password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "All fields are required." });
                return;
            }

            const interviewer = await this.interviewerService.createInterviewer(name, mobile, email, password);
            console.log(interviewer, ' this is the interviewer data in controller last one');
            res.status(HTTP_STATUS.OK).json({ success: true, message: "OTP sent successfully.", interviewerData: interviewer });

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

            if (!otp || !email) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "OTP and email are required." });
                return;
            }

            const otpInterviewer: any = await this.interviewerService.otpVerification(parseInt(otp), email);
            if (!otpInterviewer) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: otpInterviewer.message });
                return
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "OTP verified successfully." });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async resendOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email,context } = req.body;
            await this.interviewerService.resendOtp(email, context);

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Resend OTP send Successfully." });
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
            } else {
                console.log(error.message)
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            console.log(req.body, 'this is the forgot password body');
            const candidate = await this.interviewerService.forgotPassword(email);
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
            await this.interviewerService.verifyEmail(email, otp);
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
    
            // Call the service method to change the password
            await this.interviewerService.changePassword(email, password, confirmPassword);
    
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
    

    async loginInterviewer(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log(req.body, 'this is body data');

            if (!email || !password) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email and password are required." });
                return
            }

            const { accessToken, refreshToken, interviewer } = await this.interviewerService.loginInterviewer(email, password);

            // res.cookie("refreshToken", refreshToken, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     maxAge: 10 * 1000
            // })

            console.log("successfull loged in interviewer");
            res.status(HTTP_STATUS.OK).json({ success: true, message: "Login successfully completed.", token: accessToken, interviewerData: interviewer });


        } catch (error: any) {
            if (error instanceof Error) {
                res.status(409).json({ message: error.message });
            } else {
                console.log(error.message);
                res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
            }
        }
    }

    // async addDetails(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { formData, email } = req.body; // Extract formData and email from req.body
    //         const { experience, designation, organization, university, introduction } = formData || {};
            
    //         if (!experience || !designation || !organization || !university || !introduction || !email) {
    //             res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: "All fields are required." });
    //             return;
    //         }

    //         const updatedInterviewer = await this.interviewerService.addDetails(experience, designation, organization, university, introduction, email);

    //         res.status(HTTP_STATUS.OK).json({ success: true, message: "Interviewer Data is Added.", interviewerData: updatedInterviewer });
    //     } catch (error: any) {
    //         if (error instanceof Error) {
    //             res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
    //         } else {
    //             console.log(error.message);
    //             res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    //         }
    //     }
    // }
} 