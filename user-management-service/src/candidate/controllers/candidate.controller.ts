import { BadRequestException, Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ICandidateController } from '../interface/ICandidateController';
import { ICandidate, IStack } from '../interface/interface';
import { CandidateService } from '../services/candidate.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IInterviewer } from 'src/interviewer/interface/interface';
import { ChagnePasswordDTO } from '../dtos/change-password.dto';
import { CandidateDataDto, UpdateCandidateDto } from '../dtos/candidate-data.dto';
import { GetStackResponseDto, StackResponseDto } from '../dtos/stack-response.dto';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Controller('candidate')
export class CandidateController implements ICandidateController {
    constructor(private readonly candidateService: CandidateService) { }

    @Get('profileURL')
    async getProfileImage(@Headers('x-user-id') userId: string): Promise<{ success: boolean, message: string, profileURL: string }> {
        try {
            const candidate: CandidateDataDto = await this.candidateService.findCandidate(userId);
            return { success: true, message: "profile Image", profileURL: candidate.profileURL }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('profile')
    async profileCandidate(@Headers('x-user-id') userId: string): Promise<{ success: boolean; message: string; candidateData?: CandidateDataDto | null }> {
        try {
            if (!userId) {
                throw new BadRequestException('User ID is missing from the headers');
            }

            const candidateData: CandidateDataDto = await this.candidateService.findCandidate(userId);

            if (!candidateData) {
                throw new HttpException('Candidate not found', HttpStatus.NOT_FOUND);
            }

            return {
                success: true,
                message: 'Candidate profile retrieved successfully',
                candidateData: candidateData
            };
        } catch (error) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('profile')
    @UseInterceptors(FileInterceptor('profileImage'))
    async editProfileCandidate(@Headers('x-user-id') userId: string, @Body() formData: UpdateCandidateDto, @UploadedFile() file?: Express.Multer.File): Promise<{ success: boolean; message: string; profileURL?: string }> {
        try {
            const candidate = await this.candidateService.editProfileCandidate(userId, formData, file);
            return { success: true, message: "Candidate profile edited successfully.", profileURL: candidate.profileURL }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('password')
    async changePassword(@Headers('x-user-id') userId: string, @Body() formData: ChagnePasswordDTO): Promise<{ success: boolean; message: string; }> {
        try {
            if (!userId || !formData) {
                throw new BadRequestException('User ID or form data is missing');
            }


            if (formData.password !== formData.confirmPassword) {
                throw new BadRequestException('Passwords do not match');
            }

            await this.candidateService.changePassword(userId, formData);

            return {
                success: true,
                message: "Candidate password changed successfully."
            }

        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/stack')
    async getStack(): Promise<GetStackResponseDto> {
        try {
            const stackData: StackResponseDto[] = await this.candidateService.getStack();
            return { success: true, message: "Candidate Stack successfully.", stackData: stackData }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/interviewer-details/:interviewerId')
    async getInterviewerDetails(@Param('interviewerId') interviewerId: string): Promise<{ success: boolean, message: string, interviewerData: IInterviewer }> {
        try {
            const interviewerData = await this.candidateService.getInterviewer(interviewerId);
            return { success: true, message: "fetch interviewer Data", interviewerData: interviewerData }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // gRPC to premium update
    @GrpcMethod('PremiumService', 'CreatePremium')
    async getBookingData(data: { candidateId: string }): Promise<any> {
        try {
            console.log('Received data:', data); // Debug log

            if (!data || !data.candidateId) {
                throw new RpcException({ code: status.INVALID_ARGUMENT, message: 'candidateId is required' });
            }

            const candidateDataUpdate = await this.candidateService.updateCandidatePremium(data.candidateId);

            return { success: true, message: "Updated candidate premium data successfully" };
        } catch (error: any) {
            console.error('Error:', error.message);
            throw new RpcException({ code: status.INTERNAL, message: error.message || 'An error occurred' });
        }
    }


}
