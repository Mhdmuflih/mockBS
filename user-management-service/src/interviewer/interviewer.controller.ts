// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Headers,
//   BadRequestException,
//   UseInterceptors,
//   UploadedFiles,
//   Patch,
//   UploadedFile
// } from '@nestjs/common';
// import { InterviewerService } from './interviewer.service';
// import { CloudinaryService } from 'src/Config/cloudinary.service';
// import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
// import { Express } from 'express';
// import { diskStorage } from 'multer';

// @Controller('interviewer')
// export class InterviewerController {
//   constructor(
//     private readonly interviewerService: InterviewerService,
//     private readonly cloudinaryService: CloudinaryService
//   ) { }

//   @Patch('details')
//   @UseInterceptors(AnyFilesInterceptor())
//   async updateInterviewerDetails(
//     @UploadedFiles() @UploadedFiles() files: Array<Express.Multer.File>,
//     @Body() bodyData: any
//   ) {

//     const imageFile = files.find(file => file.fieldname === 'image');
//     const salaryFile = files.find(file => file.fieldname === 'salary');
//     const resumeFile = files.find(file => file.fieldname === 'resume');

//     let fileName = []
//     if (imageFile) {
//       fileName[0] = await this.cloudinaryService.uploadFile(imageFile, 'Uploads/images');
//     }

//     if (salaryFile) {
//       fileName[1] = await this.cloudinaryService.uploadFile(salaryFile, 'Uploads/salary');
//     }

//     if (resumeFile) {
//       fileName[2] = await this.cloudinaryService.uploadFile(resumeFile, 'interviews/resumes');
//     }

//     return await this.interviewerService.addDetails(bodyData, fileName)
//   }

//   @Get('profile')
//   async findOne(@Headers('x-user-id') userId: string) {
//     console.log(`User ID from header: ${userId}`);

//     if (!userId) {
//       throw new BadRequestException('User ID is missing from the headers');
//     }

//     return this.interviewerService.findOneById(userId);
//   }

//   @Patch('/password')
//   async changePassword(@Headers('x-user-id') userId: string, @Body() formData: { currentPassword: string, password: string, confirmPassword: string }) {
//     try {
//       console.log(userId, formData, 'this is the userID and formData');
//       if (!userId || !formData) {
//         throw new BadRequestException('User ID or form data is missing');
//       }

//       if (formData.password !== formData.confirmPassword) {
//         throw new BadRequestException('Passwords do not match');
//       }

//       return await this.interviewerService.changePassword(userId, formData);
//     } catch (error: any) {
//       console.error('Error:', error.message);
//       throw new BadRequestException(error.message || 'An error occurred');
//     }
//   }
// }
