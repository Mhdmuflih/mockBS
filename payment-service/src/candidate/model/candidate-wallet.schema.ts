import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type WalletDocument = CandidateWallet & Document;

@Schema()
export class CandidateWallet extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
    candidateId: Types.ObjectId;

    @Prop({ type: Number, required: true, default: 0 })
    balance: number;

    @Prop({ type: [{ 
        date: { type: Date }, 
        amount: { type: Number }, 
        description: { type: String  }, 
        currentBalance: { type: Number  } 
    }],  })
    walletHistory: {
        date: Date;
        amount: number;
        description: string;
        currentBalance: number;
    }[];
}

// Generate the Mongoose schema
export const CandidateWalletSchema = SchemaFactory.createForClass(CandidateWallet);
