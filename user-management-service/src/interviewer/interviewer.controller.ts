import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Headers, BadRequestException } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { CreateInterviewerDto } from './dto/create-interviewer.dto';
import { UpdateInterviewerDto } from './dto/update-interviewer.dto';
import { CloudinaryService } from 'src/Config/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('interviewer')
export class InterviewerController {
  constructor(
    private readonly interviewerService: InterviewerService,
    // private readonly cloudinaryService: CloudinaryService
  ) {}

  @Patch("details") // Use PATCH for updates
  async updateInterviewerDetails( @Body() bodyData: any )  {
    console.log(bodyData,  'this is the controller body data and file data')
    return await this.interviewerService.updateDetails(bodyData); // Pass the file URL if it exists
  }

  @Get('profile')
  findOne(@Headers('x-user-id') userId: any) {
    console.log(`User ID from header: ${userId}`);

    if (!userId) {
      throw new BadRequestException('User ID is missing from the headers');
    }
    return this.interviewerService.findOneById(userId); // Call the service method with `userId`
  }
}
