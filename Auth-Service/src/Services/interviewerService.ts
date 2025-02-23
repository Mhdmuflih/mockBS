import { HTTP_STATUS } from "../Constants/httpStatus";
import { MESSAGES } from "../Constants/messages";
import { IInterviewerRepository } from "../Interface/Interviewer/IInterviewerRepository";
import { IInterviewerService } from "../Interface/Interviewer/IInterviewerService";
import { generateAccessToken, generateRefreshToken } from "../JWT/jwt";
import { IInterviewer } from "../Models/interviewerModel";
import otpGenerator from "otp-generator";
import { sendEmail } from "../Utility/email";
import { passwordCompare, passwordHashing } from "../Utility/bcypt";

export class InterviewerService implements IInterviewerService {
    constructor(private interviewerRepository: IInterviewerRepository) { }

    async createInterviewer(name: string, mobile: string, email: string, password: string): Promise<any> {
        try {

            const interviewer = await this.interviewerRepository.findInterviewerByEmail(email);
            if(interviewer) {
                throw new Error("interviewer is alreday registered");
            }

            const OTP = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }));
            if (!OTP) {
                throw new Error("OTP is required and must be a valid number.");
            }
            const securePassword: string | undefined = await passwordHashing(password);

            console.log(password, "real password in candidate signup");

            const otpData = await this.interviewerRepository.createInterviewer({ name, mobile, email, password: securePassword, OTP });
            if (!otpData) {
                throw new Error("Failed to save OTP data.");
            }

            await sendEmail({ to: email, subject: "OTP Verification", otp: OTP });

            console.log("OTP Data saved successfully:", otpData);
            return otpData;

        } catch (error: any) {
            console.log("Error creating candidate:", error.message);
            throw new Error(`Error creating candidate: ${error.message}`);
        }
    }

    async otpVerification(otp: number, email: string): Promise<IInterviewer> {
        try {
            const interviewer = await this.interviewerRepository.findInterviewerByEmail(email);
            console.log(interviewer, "this is the interviewer of the otp verification");

            if (!interviewer) {
                throw new Error(MESSAGES.INTERVIEWER_NOT_FOUND);
            }

            if (interviewer.OTP !== otp) {
                throw new Error("Invalid OTP.");
            }

            if (new Date() > interviewer.expaireAt) {
                throw new Error("OTP has expired.");
            }

            await this.interviewerRepository.deleteInterviewerOTP(email);

            return interviewer;

        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async resendOtp(email: string, context: string): Promise<void> {
        try {
            const otp: number = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false }));
            await sendEmail({ to: email, subject: "OTP Verification", otp: otp });
            if(context === "Registration"){
                await this.interviewerRepository.updateInterviewerOTP(email, otp);
            }else if(context === "CandidateForgotPassword") {
                await this.interviewerRepository.updateOtp({email, otp});
            }
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async forgotPassword(email: string): Promise<IInterviewer | null> {
        try {
            const candidate: IInterviewer | null = await this.interviewerRepository.findInterviewerByEmail(email);
            if (!candidate) {
                throw new Error(MESSAGES.CANDIDATE_NOT_FOUND);
            }
    
            const OTP = parseInt(
                otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
            );
            console.log(OTP, "this is the OTP in service");
    
            if (!OTP) {
                throw new Error("OTP is required and must be a valid number.");
            }
    
            await sendEmail({ to: email, subject: "OTP Verification", otp: OTP });
    
            const otpData = await this.interviewerRepository.saveOtp({ email, otp: OTP }); // Pass `OTP` field
            console.log(otpData, 'this is the OTP saved in service');
            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
    
    async verifyEmail(email: string, otp: number): Promise<any> {
        try {
            const candidate = await this.interviewerRepository.findOtpByEmail(email);
    
            if (!candidate) {
                throw new Error(MESSAGES.CANDIDATE_NOT_FOUND);
            }
    
            if (candidate.otp !== otp) { // Ensure field name matches `OTP`
                throw new Error("Invalid OTP.");
            }
    
            if (new Date() > candidate.expaireAt) {
                throw new Error("OTP has expired.");
            }
    
            await this.interviewerRepository.deleteOtpByEmail(email);
    
            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
    
    async changePassword(email: string, password: string, confirmPassword: string): Promise<any> {
        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match.");
            }
    
            const candidateData = await this.interviewerRepository.findInterviewerByEmail(email);
    
            if (!candidateData) {
                throw new Error("Candidate not found.");
            }
    
            const securePassword: string | undefined = await passwordHashing(password);
    
            // Call the repository method to change the password
            const updatedCandidate = await this.interviewerRepository.interviewerChangePassword({
                email,
                password: securePassword
            });
    
            if (!updatedCandidate) {
                throw new Error("Error updating password.");
            }
    
            return updatedCandidate;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async loginInterviewer(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; interviewer: IInterviewer }> {
        try {
            const interviewer = await this.interviewerRepository.findInterviewerByEmail(email);
            if (!interviewer) {
                throw new Error(MESSAGES.INTERVIEWER_NOT_FOUND);
            }

            if(interviewer.isBlocked) {
                throw new Error("Interviewer is Blocked. please contact Admin!");
            }

            if (!interviewer.isVerified) {
                const otp: number = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false }));
                await sendEmail({ to: email, subject: "OTP Verification", otp: otp });
                await this.interviewerRepository.updateInterviewerOTP(email, otp);
            }

            const matchPassword: boolean | undefined = await passwordCompare(password, interviewer?.password);
            if (!matchPassword) {
                throw new Error(MESSAGES.INVALID_PASSWORD);
            }

            const accessToken: string = generateAccessToken(interviewer._id as string);
            const refreshToken: string = generateRefreshToken(interviewer._id as string);
            console.log(`accessToken: ${accessToken} and refreshToken ${refreshToken}`)

            return { accessToken, refreshToken, interviewer };
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    // async addDetails(experience: number, designation: string, organization: string, university: string, introduction: string, email: string): Promise<IInterviewer | null> {
    //     try {
    //         const interviewer = await this.interviewerRepository.findInterviewerByEmail(email);
    //         if (!interviewer) {
    //             throw new Error(MESSAGES.INTERVIEWER_NOT_FOUND);
    //         }

    //         const updateDetails = await this.interviewerRepository.addInterviewerDetails({ experience, designation, organization, university, introduction, email });
    //         return updateDetails;
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw error;
    //     }
    // }
}