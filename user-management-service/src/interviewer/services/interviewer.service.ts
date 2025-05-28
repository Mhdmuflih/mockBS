import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { IInterviewerService } from "../interface/IInterviewerService";
import { InterviewerRepository } from "../repository/interviewer.repository";
import * as bcrypt from 'bcryptjs';
import { CloudinaryService } from "src/Config/cloudinary.service";
import { ChagnePasswordDTO } from "../dto/change-password.dto";
import { ICandidate, IStack } from "src/candidate/interface/interface";
import { InterviewerCandidateRepository } from "../repository/interviewer-candidate.repository";
import { InterviewerStackRepository } from "../repository/interviewer-stack.repository";
import { InterviewerDTO } from "../dto/interviewer-data.dto";
import { IInterviewer } from "../interface/interface";
import { StackDTO } from "../dto/stack-response.dto";


@Injectable()
export class InterviewerService implements IInterviewerService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly interviewerRepository: InterviewerRepository,
        private readonly interviewerCandidateRepository: InterviewerCandidateRepository,
        private readonly interviewerStackRepository: InterviewerStackRepository

    ) { }

    async findInterviewer(userId: string): Promise<InterviewerDTO> {
        try {
            if (!userId) {
                throw new BadRequestException('User ID is missing from the request');
            }
            const interviewer: IInterviewer = await this.interviewerRepository.findOneById(userId);

            if (!interviewer) {
                throw new Error('Interviewer not found');
            }

            return InterviewerDTO.from(interviewer);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addDetails(formData: any, files: Express.Multer.File[]): Promise<InterviewerDTO> {
        try {

            const updateInterviewerDetails: IInterviewer = await this.interviewerRepository.addDetails(formData, files)

            if (!updateInterviewerDetails) {
                throw new Error("Interviewer not found.");
            }
            console.log(updateInterviewerDetails, 'this is update interviewer details');

            return InterviewerDTO.from(updateInterviewerDetails);

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async editProfileInterviewer(userId: string, formData: any, file?: Express.Multer.File): Promise<InterviewerDTO> {
        try {
            if (!formData || !userId) {
                throw new BadRequestException('formData or userId is missing');
            }
            const interviewer = await this.interviewerRepository.findOneById(userId);
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

            const interviewerData: IInterviewer =  await this.interviewerRepository.updateInterviewerData(userId, formData, fileName);
            return InterviewerDTO.from(interviewerData);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async changePassword(userId: string, formData: ChagnePasswordDTO): Promise<void> {
        try {
            const interviewer = await this.interviewerRepository.findOneById(userId);
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

    async fetchStack(): Promise<StackDTO[]> {
        try {
            const stackData: IStack[] = await this.interviewerStackRepository.findAll();
            return  StackDTO.fromList(stackData);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCandidate(candidateId: string): Promise<ICandidate> {
        try {
            return await this.interviewerCandidateRepository.findOneById(candidateId);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async sendInterviewer(data: any): Promise<IInterviewer[]> {
        try {
            const interviewers: IInterviewer[] = await this.interviewerRepository.sendInterviewer(data);
            return interviewers;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
