import { Module } from '@nestjs/common';
import { InterviewerController } from './controller/interviewer.controller';
import { InterviewerService } from './service/interviewer.service';
import { InterviewerRepository } from './repository/interviewer.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/candidate/model/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])
  ],
  controllers: [InterviewerController],
  providers: [InterviewerService, InterviewerRepository],
})
export class InterviewerModule { }
