import { Injectable } from "@nestjs/common";
import { ICandidateRepository } from "../interface/ICandidateRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Payment } from "../model/payment.schema";
import { Model } from "mongoose";

@Injectable()
export class CandidateRepository implements ICandidateRepository {
    constructor(
        @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>
    ) { }

}