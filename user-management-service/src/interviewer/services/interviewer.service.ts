import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IInterviewerService } from "../interface/IInterviewerService";
import { InterviewerRepository } from "../repository/interviewer.repository";
import * as bcrypt from 'bcryptjs';
import { IInterviewer } from "../interface/interface";
import { CloudinaryService } from "src/Config/cloudinary.service";


@Injectable()
export class InterviewerService implements IInterviewerService {
    constructor(
        private readonly interviewerRepository: InterviewerRepository,
        private readonly cloudinaryService: CloudinaryService

    ) { }

    async findInterviewer(userId: string): Promise<any> {
        try {
            if (!userId) {
                throw new BadRequestException('User ID is missing from the request');
            }

            const interviewer = await this.interviewerRepository.findOne(userId);

            if (!interviewer) {
                throw new Error('Interviewer not found');
            }

            return interviewer;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addDetails(formData: any, files: Express.Multer.File[]): Promise<any> {
        try {

            const updateInterviewerDetails = await this.interviewerRepository.addDetails(formData, files)

            if (!updateInterviewerDetails) {
                throw new Error("Interviewer not found.");
            }
            console.log(updateInterviewerDetails, 'this is update interviewer details');

            return updateInterviewerDetails;

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async editProfileInterviewer(userId: string, formData: IInterviewer, file?: Express.Multer.File): Promise<void> {
        try {
            if (!formData || !userId) {
                throw new BadRequestException('formData or userId is missing');
            }

            let fileName: string | undefined;
            if (file) {
                fileName = await this.cloudinaryService.uploadFile(file, 'Uploads/images');
                console.log(fileName, 'this is file name');
            }

            await this.interviewerRepository.updateInterviewerData(userId, formData, fileName);



        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async changePassword(userId: string, formData: { currentPassword: string; password: string; confirmPassword: string; }): Promise<void> {
        try {
            const interviewer = await this.interviewerRepository.findOne(userId);
            if (!interviewer) {
                throw new Error('interviewer not found.');
            }

            const isMatch = await bcrypt.compare(formData.currentPassword, interviewer.password);
            if (!isMatch) {
                throw new Error('Current password is incorrect');
            }

            const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 is the salt rounds

            const updatedCandidate = await this.interviewerRepository.updatePassword(userId, hashedPassword);

            if (!updatedCandidate) {
                throw new Error('Failed to update the password');
            }


        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async fetchStack(): Promise<void> {
        try {
            return await this.interviewerRepository.fetchStack();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
