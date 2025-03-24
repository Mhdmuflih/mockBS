import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { AdminRepository } from './repository/admin-payment.respository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/candidate/model/payment.schema';
import { AdminInterviewerWallet } from './repository/admin-interviewer-wallet.repository';
import { Wallet, WalletSchema } from './model/wallet';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, AdminInterviewerWallet],
})
export class AdminModule { }
