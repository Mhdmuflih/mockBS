import { Module } from '@nestjs/common';
// import { InterviewerService } from './interviewer.service';
// import { InterviewerController } from './interviewer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interviewer, InterviewerSchema } from './Model/interviewer.schema';
import { CloudinaryService } from 'src/Config/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { InterviewerRepository } from './repository/interviewer.repository';
import { InterviewerController } from './controllers/interviewer.controller';
import { InterviewerService } from './services/interviewer.service';
import { Stack, StackSchema } from 'src/admin/Model/stack.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Interviewer.name,
      schema: InterviewerSchema
    }]),
    MongooseModule.forFeature([{
      name: Stack.name,
      schema: StackSchema
    }]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [InterviewerController],
  providers: [
    InterviewerService,
    InterviewerRepository,
    CloudinaryService,
  ],
  exports: [MongooseModule]
})
export class InterviewerModule { }
