import { Module } from '@nestjs/common';
import { CandidateService } from './services/candidate.service';
import { CandidateController } from './controllers/candidate.controller';
import { InterviewerModule } from 'src/interviewer/interviewer.module';
import { SlotRepository } from './repository/slot.repository';
import { InterviewerSlot, InterviewerSlotSchema } from 'src/interviewer/model/interviewer-slot.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Scheduled, ScheduledSchema } from './model/scheduled.schema';
import { ScheduleRepository } from './repository/schedule.repositor';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewerSlot.name, schema: InterviewerSlotSchema }]),
    MongooseModule.forFeature([{ name: Scheduled.name, schema: ScheduledSchema }]),
    InterviewerModule
  ],
  controllers: [CandidateController],
  providers: [CandidateService, SlotRepository, ScheduleRepository],
  exports: [CandidateService]
})
export class CandidateModule { }
