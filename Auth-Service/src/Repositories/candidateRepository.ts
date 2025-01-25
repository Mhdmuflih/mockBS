import { ICandidateRepository } from "../Interface/Candidate/ICandidateRepository";
import Candidate, { ICandidate } from "../Models/candidateModel";
import otpModel, { IOtp } from "../Models/otpModel";
import { BaseRepository } from "./baseRepository";

class CandidateRepository extends BaseRepository<ICandidate> implements ICandidateRepository {

    constructor() {
        super(Candidate);
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

    async updateOtp(otpData: Partial<any>): Promise<void> {
        try {
            await otpModel.findOneAndUpdate({ email: otpData?.email }, { $set: { otp: otpData?.otp, createdAt: new Date(), expaireAt: new Date(Date.now() + 10 * 60 * 1000) } });
        } catch (error: any) {
            throw new Error(`Error update Otp: ${error.message}`)
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

    async candidateChangePassword({ email, password }: { email: string; password: string }): Promise<ICandidate> {
        try {
            return await this.changePassword(email, password);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error changing password: ${error.message}`);
        }
    }
    

    // async createCandidateWithGoogle(candidateData: Partial<ICandidate>): Promise<ICandidate> {
    //     try {
    //         return await this.createCandidateWithGoogle(candidateData);
    //     } catch (error: any) {
    //         console.log(error.message);
    //         throw new Error(`Error while creating Candidate : ${error instanceof Error ? error.message : String(error)}`);
    //     }
    // }


    async createCandidate(candidateData: Partial<ICandidate>): Promise<ICandidate> {
        try {
            return await this.create(candidateData);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while creating Candidate : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findCandidateByEmail(email: string): Promise<ICandidate | null> {
        try {
            return await this.findByEmail(email);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while finding Candidate : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async deleteCandidateOTP(email: string): Promise<ICandidate | null> {
        try {
            return await this.deleteOTP(email);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while delete Candidate OTP : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async updateCandidateOTP(email: string, otp: number): Promise<ICandidate | null> {
        try {
            return await this.updateOTP(email,otp);
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Error while delete Candidate OTP : ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    // async loginCandidate(candidateData: Partial<ICandidate>): Promise<any> {
    //     try {
    //         const data =  await this.model.findOne({email: candidateData.email});
    //         console.log(data, 'this is the data from repository in candidate');
    //         return data;
    //     } catch (error: any) {
    //         console.log(error.message);
    //     }
    // }
}

export default new CandidateRepository();