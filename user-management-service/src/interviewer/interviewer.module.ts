import { Module } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { InterviewerController } from './interviewer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import interviewerSchema from './Model/interviewer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Interviewer', schema: interviewerSchema }]),
  ],
  controllers: [InterviewerController],
  providers: [InterviewerService],
})
export class InterviewerModule {}
