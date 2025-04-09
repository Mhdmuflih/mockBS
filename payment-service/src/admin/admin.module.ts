import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { AdminRepository } from './repository/admin-payment.respository';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/candidate/model/payment.schema';
import { Wallet, WalletSchema } from './model/wallet';
import { AdminPremiumRepository } from './repository/admin-premium.repository';
import { PremiumPayment, PremiumPaymentSchema } from 'src/candidate/model/premium.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    MongooseModule.forFeature([{ name: PremiumPayment.name, schema: PremiumPaymentSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, AdminPremiumRepository],
})
export class AdminModule { }
