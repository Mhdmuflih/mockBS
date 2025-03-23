import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICandidateService } from '../interface/ICandidateService';
import { ICandidate, IStack } from '../interface/interface';
import { CandidateRepository } from '../repository/candidate.repository';
import * as bcrypt from 'bcryptjs';
import { CloudinaryService } from 'src/Config/cloudinary.service';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { ChagnePasswordDTO } from '../dtos/change-password.dto';
import { CandidateDataDto, UpdateCandidateDto } from '../dtos/candidate-data.dto';
import { StackResponseDto } from '../dtos/stack-response.dto';
import { CandidateInterviewerRepository } from '../repository/candidate-interviewer.repository';
import { CandidateStackRepository } from '../repository/candidate-stack.repository';


@Injectable()
export class CandidateService implements ICandidateService {

    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly candidateRepository: CandidateRepository,
        private readonly candidateInterviewerRepository: CandidateInterviewerRepository,
        private readonly candidateStackRepository: CandidateStackRepository
    ) { }

    async findCandidate(userId: string): Promise<CandidateDataDto | null> {
        try {
            if (!userId) {
                throw new BadRequestException('User ID is missing from the request');
            }

            const candidate = await this.candidateRepository.findOne(userId);

            if (!candidate) {
                return null;
            }

            return candidate;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async editProfileCandidate(userId: string, formData: UpdateCandidateDto, file?: Express.Multer.File): Promise<UpdateCandidateDto | null> {
        try {
            // console.log(formData, 'this is candidate formData')
            if (!formData || !userId) {
                throw new BadRequestException('formData or userId is missing');
            }

            const candidate = await this.candidateRepository.findOne(userId);

            let fileName: string | undefined;
            if (file) {
                fileName = await this.cloudinaryService.uploadFile(file, 'Uploads/profiles');
            }

            if (candidate.name === formData.name && candidate.mobile === formData.mobile && (!file || candidate.profileURL == fileName)) {
                throw new BadRequestException("Same data update is not allowed.")
            }


            return await this.candidateRepository.updateCandidateData(userId, formData, fileName);

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async changePassword(userId: string, formData: ChagnePasswordDTO): Promise<void> {
        try {
            const candidate = await this.candidateRepository.findOne(userId);
            if (!candidate) {
                throw new Error('Candidate not found.');
            }

            const isMatch = await bcrypt.compare(formData.currentPassword, candidate.password);
            if (!isMatch) {
                throw new Error('Current password is incorrect');
            }

            if (formData.currentPassword == formData.password) {
                throw new Error('same Password change is not allowed')
            }

            const hashedPassword = await bcrypt.hash(formData.password, 10); // 10 is the salt rounds

            const updatedCandidate = await this.candidateRepository.updatePassword(userId, hashedPassword);

            if (!updatedCandidate) {
                throw new Error('Failed to update the password');
            }

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getStack(): Promise<StackResponseDto[]> {
        try {
            return await this.candidateStackRepository.findAll();
            // return await this.candidateStackRepository.getStack();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getInterviewer(interviewerId: string): Promise<IInterviewer | null> {
        try {
            return await this.candidateInterviewerRepository.findOneById(interviewerId);
            // return await this.candidateInterviewerRepository.findInterviewer(interviewerId);
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
