import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { InterviewerModule } from 'src/interviewer/interviewer.module';
import { CandidateModule } from 'src/candidate/candidate.module';

@Module({
  imports: [
    InterviewerModule,
    CandidateModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
