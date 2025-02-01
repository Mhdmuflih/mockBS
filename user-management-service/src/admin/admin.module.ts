import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { InterviewerModule } from 'src/interviewer/interviewer.module';
import { CandidateModule } from 'src/candidate/candidate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stack, StackSchema } from './Model/stack.schema';

@Module({
  imports: [
    InterviewerModule,
    CandidateModule,
    MongooseModule.forFeature([{
      name: Stack.name,
      schema: StackSchema
    }])
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
