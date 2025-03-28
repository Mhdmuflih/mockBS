import { Module } from '@nestjs/common';
import { CandidateController } from './controller/candidate.controller';
import { CandidateService } from './service/candidate.service';
import { CandidateRepository } from './repository/candidate.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './model/payment.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CandidateInterviewerWalletRepository } from './repository/candidate-interviewer-wallet.repository';
import { Wallet, WalletSchema } from 'src/admin/model/wallet';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])
  ],
  controllers: [CandidateController],
  providers: [CandidateService, CandidateRepository, CandidateInterviewerWalletRepository],
  exports: [CandidateService]
})
export class CandidateModule { }
