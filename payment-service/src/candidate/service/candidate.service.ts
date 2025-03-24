import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICandidateService } from '../interface/ICandidateService';
import { CandidateRepository } from '../repository/candidate.repository';
import Stripe from 'stripe';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { sendBookingData } from 'src/gRPC/booking.client';

@Injectable()
export class CandidateService implements ICandidateService {
  private stripe: Stripe;

  constructor(
    private readonly candidateRepository: CandidateRepository,
  ) {
    this.stripe = new Stripe("sk_test_51QvsEdGUzdkKqzcdinByZpi9wyrb6JfwF0AVaNBOGGBLernXeTVszLCIFd19AFzPBMMqtkjLhnflACczbZtowhfW00AhK9XPQ0");
  }

  async paymentForBooking(candidateId: string, data: any): Promise<Stripe.Checkout.Session> {
    try {

      const existingPayment = await this.candidateRepository.findPayment(candidateId, data);
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
        success_url: `http://localhost:5173/candidate/payment-status?transaction_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/candidate/payment-status?status=cancelled`
      });

      // console.log(data.scheduleData, 'Stripe session created');

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



      const saveData = await this.candidateRepository.savePayment(candidateId, paymentData);
      // console.log(saveData, 'this is save data')
      return session;  // Return session to frontend
    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyPayment(sessionId: string): Promise<any> {
    try {

      const verifyPaymetData = await this.candidateRepository.findPaymentData(sessionId);

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

      await this.candidateRepository.verifyPayment(sessionId);

    } catch (error: any) {
      console.log(error.message);
      throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
