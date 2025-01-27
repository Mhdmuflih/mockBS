import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, BadRequestException } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) { }

  // @Post()
  // create(@Body() createCandidateDto: CreateCandidateDto) {
  //   return this.candidateService.create(createCandidateDto);
  // }

  @Get('profile')
  async findOne(@Headers('x-user-id') userId: any) {
    try {
      console.log(`User ID from header: ${userId}`);

      if (!userId) {
        throw new BadRequestException('User ID is missing from the headers');
      }
      return this.candidateService.findOneById(userId); // Call the service method with `userId` 
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }

  @Patch('/password')
  async changePassword(@Headers('x-user-id') userId: string, @Body() formData: { currentPassword: string, password: string, confirmPassword: string }) {
    try {
      console.log(userId, formData, 'this is the userID and formData');
      if (!userId || !formData) {
        throw new BadRequestException('User ID or form data is missing');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      return await this.candidateService.changePassword(userId, formData);
    } catch (error: any) {
      console.error('Error:', error.message);
      throw new BadRequestException(error.message || 'An error occurred');
    }
  }
}
