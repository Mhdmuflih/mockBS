import { Module } from '@nestjs/common';
import { InterviewerController } from './controller/interviewer.controller';
import { InterviewerService } from './service/interviewer.service';
import { InterviewerRepository } from './repository/interviewer.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/candidate/model/payment.schema';
import { Wallet, WalletSchema } from 'src/admin/model/wallet';
import { InterviewerWalletRepository } from './repository/interviewer-wallet.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])
  ],
  controllers: [InterviewerController],
  providers: [InterviewerService, InterviewerRepository, InterviewerWalletRepository],
})
export class InterviewerModule { }
