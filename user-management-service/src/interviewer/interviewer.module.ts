import { Module } from '@nestjs/common';
import { InterviewerService } from './interviewer.service';
import { InterviewerController } from './interviewer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import interviewerSchema from './Model/interviewer.schema';
import { CloudinaryService } from 'src/Config/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Interviewer', schema: interviewerSchema }]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [InterviewerController],
  providers: [InterviewerService, CloudinaryService],
  exports:[MongooseModule]
})
export class InterviewerModule {}
