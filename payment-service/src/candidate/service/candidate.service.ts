import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICandidateService } from '../interface/ICandidateService';
import { CandidateRepository } from '../repository/candidate.repository';
import Stripe from 'stripe';
import { sendBookingData } from 'src/gRPC/booking.client';
import { PaymentData } from '../interface/Interface';
import { CandidateInterviewerWalletRepository } from '../repository/candidate-interviewer-wallet.repository';
import { CandidatePremiumRepository } from '../repository/candidate-premium.repository';
import { sendPremiumData } from 'src/gRPC/updateCandidatePremium.client';
import { CandidateWalletRepository } from '../repository/candidate-wallet.repository';
import { CandidateWalletDTO } from '../dto/candidate.wallet.dto';

@Injectable()
export class CandidateService implements ICandidateService {
  private stripe: Stripe;

  constructor(
    private readonly candidateRepository: CandidateRepository,
    private readonly candidateInterviewerWalletRepository: CandidateInterviewerWalletRepository,
    private readonly candidatePremiumRepository: CandidatePremiumRepository,
    private readonly candidateWalletRepository: CandidateWalletRepository

  ) {
    this.stripe = new Stripe("sk_test_51QvsEdGUzdkKqzcdinByZpi9wyrb6JfwF0AVaNBOGGBLernXeTVszLCIFd19AFzPBMMqtkjLhnflACczbZtowhfW00AhK9XPQ0");
  }

  async paymentForBooking(candidateId: string, data: PaymentData): Promise<Stripe.Checkout.Session> {
    try {

      const existingPayment = await this.candidateRepository.findPayment(data);
      if (existingPayment !== null) {
        const deleteData: any = await this.candidateRepository.autoDeleteExpiredPayments(existingPayment);
        if (deleteData === undefined) {
          throw new Error("Another candidate is already making the payment. Please wait for 2 min.");
        }
      }

      const existingPaymentForBooking = await this.candidateRepository.existingPaymentData(data);
      if (existingPaymentForBooking) {
        throw new Error("already another candidate booked for this scheduled data");
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        client_reference_id: candidateId,
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: data.amount * 100,
              product_data: {
                name: `Payment for booking slot`,
              }
            },
            quantity: 1
          }
        ],
        success_url: `https://mock-bs.muflih.online/candidate/payment-status?transaction_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://mock-bs.muflih.online/candidate/payment-status?status=cancelled`
      });


      // Save only session ID for later confirmation
      const paymentData = {
        slotId: data.slotId,
        candidateId: candidateId,
        interviewerId: data.interviewerId,
        interviewerName: data.interviewerName,
        scheduleId: data.scheduleId,
        amount: data.amount,
        status: 'pending',  // Payment status to be updated later
        paymentMethod: 'card',
        sessionId: session.id, // Store Stripe session ID
        scheduleData: data.scheduleData
      };



      await this.candidateRepository.savePayment(candidateId, paymentData);
      return session;  // Return session to frontend
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyPayment(sessionId: string): Promise<{ success: boolean, message: string } | void> {
    try {

      const verifyPaymetData = await this.candidateRepository.findPaymentData(sessionId);
      console.log(verifyPaymetData, 'this is verify payment data');
      if (!verifyPaymetData.scheduleData || verifyPaymetData.status == "completed") {
        console.log("Payment successful, no need to proceed with booking.");
        return { success: true, message: "Payment verified, but no schedule data found." }; // Return early
      }

      const bookingData = {
        scheduledData: {
          stack: verifyPaymetData.scheduleData.stack,
          technology: verifyPaymetData.scheduleData.technology,
          date: verifyPaymetData.scheduleData.date,
          from: verifyPaymetData.scheduleData.from,
          to: verifyPaymetData.scheduleData.to,
          title: verifyPaymetData.scheduleData.title,
          price: verifyPaymetData.scheduleData.price,
        },
        candidateId: verifyPaymetData.candidateId,
        interviewerId: verifyPaymetData.interviewerId,
        scheduledId: verifyPaymetData.scheduleId,
        slotId: verifyPaymetData.slotId
      }


      const response = await sendBookingData(bookingData);
      // console.log(response, 'this is for the response of the booking in grpc');

      const verifyData = await this.candidateRepository.verifyPayment(sessionId);
      if (!verifyData) {
        throw new Error("slot booking payment is not verified!");
      }

      // const walletData: any = {
      //   interviewerId: verifyData.interviewerId,
      //   balance: Math.round((verifyData.amount - (verifyData.amount * 0.1))),
      //   walletHistory: [
      //     {
      //       date: new Date(),
      //       description: "credit",
      //       amount: Math.round((verifyData.amount - (verifyData.amount * 0.1))),
      //     }
      //   ]
      // }

      // const existingWallet = await this.candidateInterviewerWalletRepository.findExistingWallet(verifyData.interviewerId);

      // if (existingWallet) {
      //   await this.candidateInterviewerWalletRepository.updateWallet(walletData);
      // } else {
      //   await this.candidateInterviewerWalletRepository.createWallet(walletData);
      // }


    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async walletPaymentForBooking(candidateId: string, data: any): Promise<void> {
    try {
      const existingPayment = await this.candidateRepository.findPayment(data);
      if (existingPayment !== null) {
        const deleteData: any = await this.candidateRepository.autoDeleteExpiredPayments(existingPayment);
        if (deleteData === undefined) {
          throw new Error("Another candidate is already making the payment. Please wait for 2 min.");
        }
      }

      const existingPaymentForBooking = await this.candidateRepository.existingPaymentData(data);
      if (existingPaymentForBooking) {
        throw new Error("already another candidate booked for this scheduled data");
      }

      console.log(candidateId, data, "this is service datas");
      const candidate = await this.candidateWalletRepository.findCandidate(candidateId);
      if (!candidate) {
        throw new Error("Candidate wallet not found");
      }
      console.log(candidate, 'this is find the wallet candidate');

      if (candidate.balance < data.amount) {
        throw new Error("Insufficient wallet balance");
      }

      console.log(data.scheduleData.price, 'data schedule data and the price');

      const newBalance = candidate.balance - data.amount;
      const historyEntry = {
        date: new Date(),
        amount: data.amount,
        description: "Wallet payment for booking",
        currentBalance: newBalance
      };


      const updatedWalletData = await this.candidateWalletRepository.updateBalance(candidateId, newBalance, historyEntry);

      console.log(updatedWalletData, 'this is updated wallet data');

      const paymentData = {
        slotId: data.slotId,
        candidateId: candidateId,
        interviewerId: data.interviewerId,
        interviewerName: data.interviewerName,
        scheduleId: data.scheduleId,
        amount: data.amount,
        status: 'completed',
        paymentMethod: 'wallet',
        scheduleData: data.scheduleData
      };

      await this.candidateRepository.savePayment(candidateId, paymentData);

      const bookingData = {
        scheduledData: {
          stack: data.scheduleData.stack,
          technology: data.scheduleData.technology,
          date: data.scheduleData.date,
          from: data.scheduleData.from,
          to: data.scheduleData.to,
          title: data.scheduleData.title,
          price: data.scheduleData.price,
        },
        candidateId: candidateId,
        interviewerId: data.interviewerId,
        scheduledId: data.scheduleId,
        slotId: data.slotId
      }


      const response = await sendBookingData(bookingData);

      console.log(response, 'this is reponse ');



    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async takeThePremium(candidateId: string, premiumData: { amount: number, duration: string }): Promise<Stripe.Checkout.Session> {
    try {
      console.log(candidateId, premiumData, 'this is candidate service amount of premium');

      const existingData = await this.candidatePremiumRepository.existingPremiumData(candidateId);
      if (existingData) {
        console.log(existingData, 'this is existing Data');
        throw new Error("Alreday existing this Data");
      }

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Payment for Premium"
              },

              unit_amount: Math.round(Number(premiumData.amount) * 100), // Convert price properly
            },
            quantity: 1
          },
        ],
        success_url: `https://mock-bs.muflih.online/candidate/premium-payment-status?transaction_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://mock-bs.muflih.online/candidate/premium-payment-status?status=cancelled`
      });

      const createPremiumPaymentData = {
        candidateId: candidateId,
        amount: premiumData.amount,
        duration: premiumData.duration,
        paymentMethod: "card",
        paymentStatus: "pending",
        transactionId: session.id
      }

      const premium = await this.candidatePremiumRepository.createPremium(createPremiumPaymentData);
      console.log(premium, 'this is premium create with service');
      return session

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyPremiumPayment(candidateId: string, sessionId: string): Promise<void> {
    try {
      await this.candidatePremiumRepository.updatePaymentStatus(sessionId);

      const response = await sendPremiumData(candidateId);
      console.log(response, ' this is the reponse');

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCandidateTotalAmount(candidateId: string): Promise<{ total: number, walletData: CandidateWalletDTO }> {
    try {
      const total = await this.candidateRepository.getTotalAmount(candidateId);
      const walletData = await this.candidateWalletRepository.getWalletData(candidateId);
      let walletDTO: CandidateWalletDTO | null = null;
      if (walletData) {
        walletDTO = CandidateWalletDTO.from(walletData);
      }
      return { total: total, walletData: walletDTO };
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async cancelInterview(candidateId: string, id: string): Promise<any> {
    try {

      const paymentData = await this.candidateRepository.findPaymentDataForCancel(candidateId, id);

      if (!paymentData) {
        throw new HttpException('Scheduled payment interview not found', HttpStatus.NOT_FOUND);
      }

      console.log(paymentData, 'this is payment data ');
      const updateInterviewStatus = await this.candidateRepository.updateInterviewStatus(candidateId, id, "cancelled");
      console.log(updateInterviewStatus, 'update interview status')
      const candidateWalletData = {
        candidateId: candidateId,
        balance: Math.round((paymentData.amount - (paymentData.amount * 0.1))),
        walletHistory: [
          {
            date: new Date(),
            description: `${id} Interview Cancel to cradit amout`,
            amount: Math.round((paymentData.amount - (paymentData.amount * 0.1))),
          }
        ]
      }
      console.log(candidateWalletData, 'this is candidate wallet data');

      const existingWallet = await this.candidateWalletRepository.existingWallet(candidateId)
      if (existingWallet) {
        await this.candidateWalletRepository.updateWallet(candidateWalletData)
      } else {
        await this.candidateWalletRepository.createWallet(candidateWalletData);
      }


      console.log(candidateId, id, 'this is service ids');
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async sendMoney(candidateId: string, scheduleId: string): Promise<any> {
    try {
      const findTheData = await this.candidateRepository.findThePaymentData(candidateId, scheduleId);
      if (findTheData) {
        throw new Error("already change this payment status");
      }
      const updateInterviewStatus = await this.candidateRepository.updateInterviewStatus(candidateId, scheduleId, "completed");

      const paymentData = await this.candidateRepository.findPaymentDataForCancel(candidateId, scheduleId);

      const walletData: any = {
        interviewerId: paymentData.interviewerId,
        balance: Math.round((paymentData.amount - (paymentData.amount * 0.1))),
        walletHistory: [
          {
            date: new Date(),
            description: "credit",
            amount: Math.round((paymentData.amount - (paymentData.amount * 0.1))),
          }
        ]
      }


      const existingWallet = await this.candidateInterviewerWalletRepository.findExistingWallet(paymentData.interviewerId);

      if (existingWallet) {
        await this.candidateInterviewerWalletRepository.updateWallet(walletData);
      } else {
        await this.candidateInterviewerWalletRepository.createWallet(walletData);
      }
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
