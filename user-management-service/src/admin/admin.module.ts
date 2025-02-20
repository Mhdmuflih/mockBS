import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { InterviewerModule } from 'src/interviewer/interviewer.module';
import { CandidateModule } from 'src/candidate/candidate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stack, StackSchema } from './Model/stack.schema';
import { AdminRepository } from './repository/admin.repository';

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
  providers: [AdminService, AdminRepository],
})
export class AdminModule { }
