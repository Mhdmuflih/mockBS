import { Module } from '@nestjs/common';
import { CandidateController } from './controller/candidate.controller';
import { CandidateService } from './service/candidate.service';
import { CandidateRepository } from './repository/candidate.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './model/payment.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CandidateInterviewerWalletRepository } from './repository/candidate-interviewer-wallet.repository';
import { Wallet, WalletSchema } from 'src/admin/model/wallet';
import { PremiumPayment, PremiumPaymentSchema } from './model/premium.schema';
import { CandidatePremiumRepository } from './repository/candidate-premium.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    MongooseModule.forFeature([{name: PremiumPayment.name, schema: PremiumPaymentSchema}])
  ],
  controllers: [CandidateController],
  providers: [CandidateService, CandidateRepository, CandidateInterviewerWalletRepository, CandidatePremiumRepository],
  exports: [CandidateService]
})
export class CandidateModule { }
