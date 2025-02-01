import { BadRequestException, Body, Controller, Get, Headers, HttpException, HttpStatus, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ICandidateController } from '../interface/ICandidateController';
import { ICandidateService } from '../interface/ICandidateService';
import { ICandidate } from '../interface/interface';
import { CandidateService } from '../services/candidate.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { CandidateResponseDto } from '../dtos/candidate.response.dto';

@Controller('candidate')
export class CandidateController implements ICandidateController {
    constructor(private readonly candidateService: CandidateService) { }

    @Get('profile')
    async profileCandidate(@Headers('x-user-id') userId: string): Promise<{ success: boolean; message: string; candidateData?: ICandidate | null }> {
        try {
            console.log(userId, 'this is user id')
            if (!userId) {
                throw new BadRequestException('User ID is missing from the headers');
            }

            const candidateData: any = await this.candidateService.findCandidate(userId);

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
    async editProfileCandidate(@Headers('x-user-id') userId: string, @Body() formData: ICandidate, @UploadedFile() file?: Express.Multer.File): Promise<{ success: boolean; message: string; }> {
        try {

            await this.candidateService.editProfileCandidate(userId, formData, file);

            return { success: true, message: "Candidate profile edited successfully." }
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('password')
    async changePassword(@Headers('x-user-id') userId: string, @Body() formData: { currentPassword: string; password: string; confirmPassword: string; }): Promise<{ success: boolean; message: string; }> {
        try {
            console.log(userId, formData, 'this is the userID and formData');
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
}
