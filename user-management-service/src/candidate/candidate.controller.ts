import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, BadRequestException } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  // @Post()
  // create(@Body() createCandidateDto: CreateCandidateDto) {
  //   return this.candidateService.create(createCandidateDto);
  // }

  @Get('profile')
  findOne(@Headers('x-user-id') userId: any) {
    console.log(`User ID from header: ${userId}`);

    if (!userId) {
      throw new BadRequestException('User ID is missing from the headers');
    }
    return this.candidateService.findOneById(userId); // Call the service method with `userId`
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.candidateService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
  //   return this.candidateService.update(+id, updateCandidateDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.candidateService.remove(+id);
  // }
}
