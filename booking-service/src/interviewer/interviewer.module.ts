import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewerSlot, InterviewerSlotSchema } from './model/interviewer-slot.schema';
import { InterviewerService } from './services/interviewer.service';
import { InterviewerSlotController } from './controllers/interviewer.controller';
import { interviewerSlotRepository } from './repository/interviewer.slot.repository';
import { CandidateModule } from 'src/candidate/candidate.module';
import { Scheduled, ScheduledSchema } from 'src/candidate/model/scheduled.schema';
import { ScheduleRepository } from './repository/scheduled.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewerSlot.name, schema: InterviewerSlotSchema }]),
    MongooseModule.forFeature([{name: Scheduled.name, schema: ScheduledSchema}]),
  ],
  controllers: [InterviewerSlotController],
  providers: [
    InterviewerService,
    interviewerSlotRepository,
    ScheduleRepository
  ],
})
export class InterviewerModule { }
