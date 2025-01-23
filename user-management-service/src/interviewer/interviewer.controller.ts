import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { CreateInterviewerDto } from './dto/create-interviewer.dto';
import { UpdateInterviewerDto } from './dto/update-interviewer.dto';

@Controller('interviewer')
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService) {}

  @Patch("details") // Use PATCH for updates
  async updateInterviewerDetails(@Body() bodyData: CreateInterviewerDto) {
    return await this.interviewerService.updateDetails(bodyData);
  }

  // @Get()
  // findAll() {
  //   return this.interviewerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.interviewerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInterviewerDto: UpdateInterviewerDto) {
  //   return this.interviewerService.update(+id, updateInterviewerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.interviewerService.remove(+id);
  // }
}
