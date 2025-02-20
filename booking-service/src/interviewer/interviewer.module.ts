import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewerSlot, InterviewerSlotSchema } from './model/interviewer-slot.schema';
import { InterviewerService } from './services/interviewer.service';
import { InterviewerSlotController } from './controllers/interviewer.controller';
import { interviewerSlotRepository } from './repository/interviewer.slot.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: InterviewerSlot.name, schema: InterviewerSlotSchema }])
  ],
  controllers: [InterviewerSlotController],
  providers: [
    InterviewerService,
    interviewerSlotRepository
  ],
})
export class InterviewerModule { }
