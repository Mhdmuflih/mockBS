import { BadRequestException, Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { IInterviewerController } from "../interface/IInterviewerController";
import { CloudinaryService } from "src/Config/cloudinary.service";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { InterviewerService } from "../services/interviewer.service";
import { IInterviewer } from "../interface/interface";
import { GrpcMethod } from "@nestjs/microservices";
import { InterviewerDataDto, UpdateInterviewerDto } from "../dto/interviewer-data.dto";
import { ChagnePasswordDTO } from "../dto/change-password.dto";
import { GetStackResponseDto, StackResponseDto } from "../dto/stack-response.dto";
import { ICandidate } from "src/candidate/interface/interface";

@Controller('interviewer')
export class InterviewerController implements IInterviewerController {
    constructor(
        private readonly interviewerService: InterviewerService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Get('profileURL')
    async getProfileImage(@Headers('x-user-id') userId: string): Promise<{success: boolean, message: string, profileURL: string}> {
        try {
            const interviewer = await this.interviewerService.findInterviewer(userId);
            return {success: true, message: "profile Image", profileURL: interviewer.profileURL}
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Patch('details')
    @UseInterceptors(AnyFilesInterceptor())
    async updateInterviewerDetails(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() bodyData: UpdateInterviewerDto
    ):Promise<{ success: boolean, message: string, interviewerData: UpdateInterviewerDto }> {

        try {
            const imageFile = files.find(file => file.fieldname === 'image');
            const salaryFile = files.find(file => file.fieldname === 'salary');
            const resumeFile = files.find(file => file.fieldname === 'resume');

            let fileName = []
            if (imageFile) {
                fileName[0] = await this.cloudinaryService.uploadFile(imageFile, 'Uploads/images');
            }

            if (salaryFile) {
                fileName[1] = await this.cloudinaryService.uploadFile(salaryFile, 'Uploads/salary');
            }

            if (resumeFile) {
                fileName[2] = await this.cloudinaryService.uploadFile(resumeFile, 'interviews/resumes');
            }

            const updateInterviewerDetails = await this.interviewerService.addDetails(bodyData, fileName)

            return { success: true, message: 'Details added successfully', interviewerData: updateInterviewerDetails };

        } catch (error: any) {
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }

    @Get('profile')
    async profileInterviewer(@Headers('x-user-id') userId: string): Promise<{ success: boolean; message: string; interviewerData?: InterviewerDataDto }> {
        try {
            if (!userId) {
                throw new BadRequestException('User ID is missing from the headers');
            }

            const interviewer: any = await this.interviewerService.findInterviewer(userId);

            if (!interviewer) {
                throw new HttpException('interviewer not found', HttpStatus.NOT_FOUND);
            }

            return {
                success: true,
                message: 'Candidate profile retrieved successfully',
                interviewerData: interviewer
            };
        } catch (error: any) {
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }

    @Patch('profile')
    @UseInterceptors(FileInterceptor('profileImage'))
    async editProfileInterviewer(@Headers('x-user-id') userId: string, @Body() formData: UpdateInterviewerDto, @UploadedFile() file?: Express.Multer.File): Promise<{ success: boolean; message: string; profileURL:string }> {
        try {
            const interviewer: any = await this.interviewerService.editProfileInterviewer(userId, formData, file);
            return { success: true, message: "Candidate profile edited successfully.", profileURL: interviewer.profileURL }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Patch('password')
    async changePassword(@Headers('x-user-id') userId: string, @Body() formData: ChagnePasswordDTO): Promise<{success: boolean, message: string}> {
        try {
            if (!userId || !formData) {
                throw new BadRequestException('User ID or form data is missing');
            }

            if (formData.password !== formData.confirmPassword) {
                throw new BadRequestException('Passwords do not match');
            }

            await this.interviewerService.changePassword(userId, formData);

            return {
                success: true,
                message: "Interviewer password changed successfully."
            }

        } catch (error: any) {
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }

    @Post('slot')
    async fetchStackData(): Promise<GetStackResponseDto> {
        try {
            const stack: StackResponseDto[] = await this.interviewerService.fetchStack();
            console.log(stack, 'this is stack data')
            return {success: true, message: "stack Data", stackData: stack}
        } catch (error: any) {
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }

    @Get('/candidate-details/:candidateId')
    async getCandidateData(@Param('candidateId') candidateId: string): Promise<{success: boolean; message: string; candidateData: ICandidate}> {
        try {
            const candidateData = await this.interviewerService.getCandidate(candidateId);
            return {success: true, message: "get candidate data", candidateData: candidateData};
        } catch (error: any) {
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }

    @GrpcMethod('InterviewerService', 'SendInterviewer')
    async getInterviewerData(interviewerId: string): Promise<{interviewers: InterviewerDataDto[]}> {
        try {
            if(!interviewerId){
                throw new Error('Invalid request data in grpc');
            }

            const interviewerDatas = await this.interviewerService.sendInterviewer(interviewerId);
            // console.log(interviewerDatas, 'this is interviewer Data in controllers')
            return { interviewers: interviewerDatas}
        } catch (error: any) { 
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }
}