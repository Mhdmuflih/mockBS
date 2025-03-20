import { forwardRef, Module } from '@nestjs/common';
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
import { CandidateModule } from 'src/candidate/candidate.module';
import { InterviewerCandidateRepository } from './repository/interviewer-candidate.repository';
import { InterviewerStackRepository } from './repository/interviewer-stack.repository';

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
    forwardRef(() => CandidateModule)
  ],
  controllers: [InterviewerController],
  providers: [
    CloudinaryService,
    InterviewerService,
    InterviewerRepository,
    InterviewerCandidateRepository,
    InterviewerStackRepository
  ],
  exports: [MongooseModule]
})
export class InterviewerModule { }
