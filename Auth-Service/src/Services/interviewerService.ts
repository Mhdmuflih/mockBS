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

            const otp = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }));
            if (!otp) {
                throw new Error("OTP is required and must be a valid number.");
            }

            const otpData = await this.interviewerRepository.saveOtp({ name, mobile, email, password, otp });
            if (!otpData) {
                throw new Error("Failed to save OTP data.");
            }

            await sendEmail({ to: email, subject: "OTP Verification", otp: otp });

            console.log("OTP Data saved successfully:", otpData);
            return otpData;

        } catch (error: any) {
            console.log("Error creating candidate:", error.message);
            throw new Error(`Error creating candidate: ${error.message}`);
        }
    }

    async otpVerification(otp: number, email: string): Promise<IInterviewer> {
        try {
            const interviewer = await this.interviewerRepository.findOtpByEmail(email);
            console.log(interviewer, "this is the interviewer of the otp verification");

            if (!interviewer) {
                throw new Error(MESSAGES.INTERVIEWER_NOT_FOUND);
            }

            if (interviewer.otp !== otp) {
                throw new Error("Invalid OTP.");
            }

            // if (new Date() > interviewer.expaireAt) {
            //     throw new Error("OTP has expired.");
            // }

            const securePassword: string | undefined = await passwordHashing(interviewer.password);

            const newInterviewer = await this.interviewerRepository.createInterviewer({
                name: interviewer.name,
                mobile: interviewer.mobile,
                email: interviewer.email,
                password: securePassword
            });

            await this.interviewerRepository.deleteOtpByEmail(email);

            return newInterviewer;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async resendOtp(email: string): Promise<void> {
        try {
            const otp: number = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false }));
            await sendEmail({ to: email, subject: "OTP Verification", otp: otp });
            await this.interviewerRepository.updateOtp({ otp, email });
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

    async addDetails(experience: number, designation: string, organization: string, university: string, introduction: string, email: string): Promise<IInterviewer | null> {
        try {
            const interviewer = await this.interviewerRepository.findInterviewerByEmail(email);
            if (!interviewer) {
                throw new Error(MESSAGES.INTERVIEWER_NOT_FOUND);
            }

            const updateDetails = await this.interviewerRepository.addInterviewerDetails({ experience, designation, organization, university, introduction, email });
            return updateDetails;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}