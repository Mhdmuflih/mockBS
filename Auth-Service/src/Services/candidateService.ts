import { HTTP_STATUS } from "../Constants/httpStatus";
import { MESSAGES } from "../Constants/messages";
import { ICandidateRepository } from "../Interface/Candidate/ICandidateRepository";
import { ICandidateService } from "../Interface/Candidate/ICandidateService";
import { OTP } from "../Interface/Interface";
import { generateAccessToken, generateRefreshToken } from "../JWT/jwt";
import { ICandidate } from "../Models/candidateModel";
import otpGenerator from "otp-generator";
import { sendEmail } from "../Utility/email";
import otpModel, { IOtp } from "../Models/otpModel";
import { passwordCompare, passwordHashing } from "../Utility/bcypt";

export class CandidateService implements ICandidateService {
    constructor(
        private candidateRepository: ICandidateRepository,
    ) { };

    async createCandidate(name: string, mobile: string, email: string, password: string): Promise<any> {
        try {

            const otp = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }));
            if (!otp) {
                throw new Error("OTP is required and must be a valid number.");
            }

            console.log(password, "real password in candidate signup");

            const otpData = await this.candidateRepository.saveOtp({ name, mobile, email, password, otp });
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


    async otpVerification(otp: number, email: string): Promise<ICandidate> {
        try {

            const candidate = await this.candidateRepository.findOtpByEmail(email);
            console.log(candidate, 'service candidate');

            if (!candidate) {
                throw new Error(MESSAGES.CANDIDATE_NOT_FOUND);
            }

            if (candidate.otp !== otp) {
                throw new Error("Invalid OTP.")
            }

            if (new Date() > candidate.expaireAt) {
                throw new Error("OTP has expired.");
            }

            const securePassword: string | undefined = await passwordHashing(candidate.password);

            const newCandidate = await this.candidateRepository.createCandidate({
                name: candidate.name,
                mobile: candidate.mobile,
                email: candidate.email,
                password: securePassword,
            });

            await this.candidateRepository.deleteOtpByEmail(email);

            return newCandidate

        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }


    async resendOtp(email: string): Promise<void> {
        try {
            const otp: number = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false }));
            await sendEmail({ to: email, subject: "OTP Verification", otp: otp });
            await this.candidateRepository.updateOtp({otp, email});
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }


    async loginCandidate(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; candidate: ICandidate }> {
        try {
            const candidate = await this.candidateRepository.findCandidateByEmail(email);
            if (!candidate) {
                throw new Error(MESSAGES.CANDIDATE_NOT_FOUND);
            }

            const matchPassword: boolean | undefined = await passwordCompare(password, candidate?.password);
            if (!matchPassword) {
                throw new Error("Password is Not Match.")
            }

            const accessToken: string = generateAccessToken(candidate._id as string);
            const refreshToken: string = generateRefreshToken(candidate._id as string);
            console.log(`accessToken: ${accessToken} and refreshToken ${refreshToken}`)

            return { accessToken, refreshToken, candidate };
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}