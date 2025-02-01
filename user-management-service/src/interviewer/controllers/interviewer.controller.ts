import { BadRequestException, Body, Controller, Get, Headers, HttpException, HttpStatus, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { IInterviewerController } from "../interface/IInterviewerController";
import { CloudinaryService } from "src/Config/cloudinary.service";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { InterviewerService } from "../services/interviewer.service";
import { IInterviewer } from "../interface/interface";

@Controller('interviewer')
export class InterviewerController implements IInterviewerController {
    constructor(
        private readonly interviewerService: InterviewerService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Patch('details')
    @UseInterceptors(AnyFilesInterceptor())
    async updateInterviewerDetails(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() bodyData: any
    ) {

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
            console.log(updateInterviewerDetails, 'this is the controlelr data last')

            return { success: true, message: 'Details added successfully', interviewerData: updateInterviewerDetails };

        } catch (error: any) {
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }

    @Get('profile')
    async profileInterviewer(@Headers('x-user-id') userId: string): Promise<{ success: boolean; message: string; interviewerData?: any }> {
        try {
            console.log(userId, 'this is user id');
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
    async editProfileInterviewer(@Headers('x-user-id') userId: string, @Body() formData: IInterviewer, @UploadedFile() file?: Express.Multer.File): Promise<{ success: boolean; message: string; }> {
        try {

            await this.interviewerService.editProfileInterviewer(userId, formData, file);

            return { success: true, message: "Candidate profile edited successfully." }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Patch('password')
    async changePassword(@Headers('x-user-id') userId: string, @Body() formData: { currentPassword: string, password: string, confirmPassword: string }) {
        try {
            console.log(userId, formData, 'this is the userID and formData');
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
    async fetchStackData(): Promise<{ success: boolean; message: string; stackData: any }> {
        try {
            const stack = await this.interviewerService.fetchStack();
            return {success: true, message: "stack Data", stackData: stack}
        } catch (error: any) {
            console.error('Error:', error.message);
            throw new BadRequestException(error.message || 'An error occurred');
        }
    }
}