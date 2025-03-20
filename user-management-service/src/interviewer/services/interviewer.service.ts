import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { IInterviewerService } from "../interface/IInterviewerService";
import { InterviewerRepository } from "../repository/interviewer.repository";
import * as bcrypt from 'bcryptjs';
import { IInterviewer } from "../interface/interface";
import { CloudinaryService } from "src/Config/cloudinary.service";
import { InterviewerDataDto, UpdateInterviewerDto } from "../dto/interviewer-data.dto";
import { ChagnePasswordDTO } from "../dto/change-password.dto";
import { StackResponseDto } from "../dto/stack-response.dto";
import { ICandidate } from "src/candidate/interface/interface";
import { InterviewerCandidateRepository } from "../repository/interviewer-candidate.repository";
import { InterviewerStackRepository } from "../repository/interviewer-stack.repository";


@Injectable()
export class InterviewerService implements IInterviewerService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly interviewerRepository: InterviewerRepository,
        private readonly interviewerCandidateRepository: InterviewerCandidateRepository,
        private readonly interviewerStackRepository: InterviewerStackRepository

    ) { }

    async findInterviewer(userId: string): Promise<InterviewerDataDto> {
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

    async addDetails(formData: UpdateInterviewerDto, files: Express.Multer.File[]): Promise<UpdateInterviewerDto> {
        try {

            const updateInterviewerDetails: UpdateInterviewerDto = await this.interviewerRepository.addDetails(formData, files)

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

    async editProfileInterviewer(userId: string, formData: UpdateInterviewerDto, file?: Express.Multer.File): Promise<UpdateInterviewerDto> {
        try {
            if (!formData || !userId) {
                throw new BadRequestException('formData or userId is missing');
            }

            const interviewer = await this.interviewerRepository.findOne(userId);
            if (!interviewer) {
                throw new NotFoundException('Interviewer not found');
            }

            let fileName: string | undefined;
            if (file) {
                fileName = await this.cloudinaryService.uploadFile(file, 'Uploads/images');
            }

            const isSameData = (
                interviewer.name == formData.name &&
                interviewer.mobile == formData.mobile &&
                interviewer.currentDesignation == formData.currentDesignation &&
                interviewer.yearOfExperience == formData.yearOfExperience &&
                interviewer.organization == formData.organization &&
                interviewer.university == formData.university &&
                interviewer.introduction == formData.introduction &&
                (!file || interviewer.profileURL === fileName)
            );
            if (isSameData) {
                throw new BadRequestException("Same data update is not allowed.");
            }

            return await this.interviewerRepository.updateInterviewerData(userId, formData, fileName);

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async changePassword(userId: string, formData: ChagnePasswordDTO): Promise<void> {
        try {
            const interviewer = await this.interviewerRepository.findOne(userId);
            if (!interviewer) {
                throw new Error('interviewer not found.');
            }

            const isMatch = await bcrypt.compare(formData.currentPassword, interviewer.password);
            if (!isMatch) {
                throw new Error('Current password is incorrect');
            }

            if (formData.password === formData.currentPassword) {
                throw new Error('same Password change is not allowed');
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

    async fetchStack(): Promise<StackResponseDto[]> {
        try {
            return await this.interviewerStackRepository.fetchStack();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCandidate(candidateId: string): Promise<ICandidate> {
        try {
            return await this.interviewerCandidateRepository.getCandidate(candidateId);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async sendInterviewer(data: any): Promise<InterviewerDataDto[]> {
        try {
            const interviewers = await this.interviewerRepository.sendInterviewer(data);
            return interviewers;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
