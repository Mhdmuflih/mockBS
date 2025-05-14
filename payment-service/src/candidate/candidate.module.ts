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
import { CandidateWallet, CandidateWalletSchema } from './model/candidate-wallet.schema';
import { CandidateWalletRepository } from './repository/candidate-wallet.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    MongooseModule.forFeature([{ name: PremiumPayment.name, schema: PremiumPaymentSchema }]),
    MongooseModule.forFeature([{ name: CandidateWallet.name, schema: CandidateWalletSchema }])
  ],
  controllers: [CandidateController],
  providers: [CandidateService, CandidateRepository, CandidateInterviewerWalletRepository, CandidatePremiumRepository, CandidateWalletRepository],
  exports: [CandidateService]
})
export class CandidateModule { }
