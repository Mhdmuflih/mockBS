import { IInterviewerRepository } from "../Interface/Interviewer/IInterviewerRepository";
import Interviewer, { IInterviewer } from "../Models/interviewerModel";
import otpModel, { IOtp } from "../Models/otpModel";
import { BaseRepository } from "./baseRepository";

class InterviewerRepository extends BaseRepository<IInterviewer> implements IInterviewerRepository {
    constructor() {
        super(Interviewer);
    }

    async saveOtp(otpData: Partial<IOtp>): Promise<IOtp | null> {
        try {
            return await otpModel.create(otpData);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error saving OTP: ${error.message}`)
        }
    }

    async findOtpByEmail(email: string): Promise<IOtp | null> {
        try {
            return await otpModel.findOne({ email });
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error finding OTP: ${error.message}`);
        }
    }

    async deleteOtpByEmail(email: string): Promise<void> {
        try {
            await otpModel.deleteMany({ email });
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error Deleting OTP: ${error.message}`);
        }
    }

    async updateOtp(otpData: Partial<any>): Promise<void> {
        try {
            await otpModel.findOneAndUpdate({ email: otpData?.email }, { $set: { otp: otpData?.otp, createdAt: new Date(), expaireAt: new Date(Date.now() + 10 * 60 * 1000) } });
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error update OTP: ${error.message}`);
        }
    }

    async createInterviewer(interviewerData: Partial<IInterviewer>): Promise<any> {
        try {
            return await this.create(interviewerData);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while creating interviewer : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findInterviewerById(interviewerId: string): Promise<IInterviewer | null> {
        try {
            return await this.findOne({_id: interviewerId});
        } catch (error:  any) {
            console.log(error.message);
            throw new Error(`Error while creating interviewer : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findInterviewerByEmail(email: string): Promise<IInterviewer | null> {
        try {
            return this.findOne({ email });
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while finding Interviewer : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async interviewerChangePassword({ email, password }: { email: string; password: string }): Promise<IInterviewer> {
        try {
            return await this.changePassword(email, password);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error changing password: ${error.message}`);
        }
    }

    async deleteInterviewerOTP(email: string): Promise<IInterviewer | null> {
        try {
            return await this.deleteOTP(email);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while delete Candidate OTP : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async updateInterviewerOTP(email: string, otp: number): Promise<IInterviewer | null> {
        try {
            return await this.updateOTP(email, otp);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while delete Candidate OTP : ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}

export default new InterviewerRepository();