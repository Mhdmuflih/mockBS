import { HTTP_STATUS } from "../Constants/httpStatus";
import { MESSAGES } from "../Constants/messages";
import { ICandidateRepository } from "../Interface/Candidate/ICandidateRepository";
import { ICandidateService } from "../Interface/Candidate/ICandidateService";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../JWT/jwt";
import { ICandidate } from "../Models/candidateModel";
import otpGenerator from "otp-generator";
import { sendEmail } from "../Utility/email";
import { passwordCompare, passwordHashing } from "../Utility/bcypt";

export class CandidateService implements ICandidateService {
    constructor(
        private candidateRepository: ICandidateRepository,
    ) { };

    async googleAuth(googleData: any): Promise<{ accessToken: string; refreshToken: string; candidate: ICandidate }> {
        try {
          if (!googleData.email || !googleData.name || !googleData.profileImage) {
            throw new Error("Google data is missing required fields.");
          }
      
          const existingCandidate = await this.candidateRepository.findCandidateByEmail(googleData.email);
          if (existingCandidate) {
            const accessToken = generateAccessToken(existingCandidate._id as string);
            const refreshToken = generateRefreshToken(existingCandidate._id as string);
            return { accessToken, refreshToken, candidate: existingCandidate };
          }
      
          const newCandidate: ICandidate = await this.candidateRepository.createCandidate({
            name: googleData.name,
            email: googleData.email,
            password: "", // Social login users don't have passwords
            mobile: "Not Provided",
            profileURL: googleData.profileImage,
            isVerified: true,
          });
      
          const accessToken = generateAccessToken(newCandidate._id as string);
          const refreshToken = generateRefreshToken(newCandidate._id as string);
      
          return { accessToken, refreshToken, candidate: newCandidate };
        } catch (error: any) {
          console.error("Error in Google Auth Service:", error.message);
          throw new Error("Failed to authenticate with Google.");
        }
      }
      

    async createCandidate(name: string, mobile: string, email: string, password: string): Promise<any> {
        try {

            const OTP = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }));
            if (!OTP) {
                throw new Error("OTP is required and must be a valid number.");
            }

            const existingEmail = await this.candidateRepository.findCandidateByEmail(email);
            if (existingEmail) {
                throw new Error("Email already exists. Please use a different email.");
            }

            const securePassword: string | undefined = await passwordHashing(password);
            console.log(password, "real password in candidate signup");

            const otpData = await this.candidateRepository.createCandidate({ name, mobile, email, password: securePassword, OTP });
            if (!otpData) {
                throw new Error("Failed to save OTP data.");
            }

            await sendEmail({ to: email, subject: "OTP Verification", otp: OTP });

            return otpData;

        } catch (error: any) {
            console.log("Error creating candidate:", error.message);
            throw new Error(`Error creating candidate: ${error.message}`);
        }
    }


    async otpVerification(otp: number, email: string): Promise<ICandidate> {
        try {

            const candidate = await this.candidateRepository.findCandidateByEmail(email);
            if (!candidate) {
                throw new Error(MESSAGES.CANDIDATE_NOT_FOUND);
            }

            if (candidate.OTP !== otp) {
                throw new Error("Invalid OTP.")
            }

            if (new Date() > candidate.expaireAt) {
                throw new Error("OTP has expired.");
            }

            await this.candidateRepository.deleteCandidateOTP(email);

            return candidate;

        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }


    async resendOtp(email: string, context: string): Promise<void> {
        try {
            const otp: number = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false }));
            await sendEmail({ to: email, subject: "OTP Verification", otp: otp });
            if (context === "Registration") {
                await this.candidateRepository.updateCandidateOTP(email, otp);
            } else if (context === "CandidateForgotPassword") {
                await this.candidateRepository.updateOtp({ email, otp });
            }
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async forgotPassword(email: string): Promise<ICandidate | null> {
        try {
            const candidate: ICandidate | null = await this.candidateRepository.findCandidateByEmail(email);
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

            const otpData = await this.candidateRepository.saveOtp({ email, otp: OTP }); // Pass `OTP` field
            console.log(otpData, 'this is the OTP saved in service');
            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    async verifyEmail(email: string, otp: number): Promise<any> {
        try {
            const candidate = await this.candidateRepository.findOtpByEmail(email);

            if (!candidate) {
                throw new Error(MESSAGES.CANDIDATE_NOT_FOUND);
            }

            if (candidate.otp !== otp) { // Ensure field name matches `OTP`
                throw new Error("Invalid OTP.");
            }

            if (new Date() > candidate.expaireAt) {
                throw new Error("OTP has expired.");
            }

            await this.candidateRepository.deleteOtpByEmail(email);

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

            const candidateData = await this.candidateRepository.findCandidateByEmail(email);

            if (!candidateData) {
                throw new Error("Candidate not found.");
            }

            const securePassword: string | undefined = await passwordHashing(password);

            // Call the repository method to change the password
            const updatedCandidate = await this.candidateRepository.candidateChangePassword({
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



    async loginCandidate(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; candidate: ICandidate }> {
        try {
            const candidate = await this.candidateRepository.findCandidateByEmail(email);
            if (!candidate) {
                throw new Error(MESSAGES.CANDIDATE_NOT_FOUND);
            }
            
            if(candidate.isBlocked) {
                throw new Error("Candidate is Blocked. please contact Admin!");
            }

            if (!candidate.isVerified) {
                const otp: number = parseInt(otpGenerator.generate(4, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false }));
                await sendEmail({ to: email, subject: "OTP Verification", otp: otp });
                await this.candidateRepository.updateCandidateOTP(email, otp);
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


    async validateRefreshToken(token: string): Promise<{accessToken: string, refreshToken: string, candidate:ICandidate}> {
        try {
            const decode: any = verifyToken(token);
            const candidate = await this.candidateRepository.findCandidateById(decode.userId);

            if(!candidate) {
                const error: any = new Error("User not Found");
                error.status = HTTP_STATUS.NOT_FOUND;
                throw error;
            }

            const accessToken = generateAccessToken(candidate._id as string);
            const refreshToken = generateRefreshToken(candidate._id as string);

            return {accessToken, refreshToken, candidate};

        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }
}