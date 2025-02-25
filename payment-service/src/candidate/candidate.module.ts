import { Module } from '@nestjs/common';
import { CandidateController } from './controller/candidate.controller';
import { CandidateService } from './service/candidate.service';
import { CandidateRepository } from './repository/candidate.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './model/payment.schema';
import { StripeService } from './service/stripe.service';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService, CandidateRepository, StripeService],
})
export class CandidateModule {}
