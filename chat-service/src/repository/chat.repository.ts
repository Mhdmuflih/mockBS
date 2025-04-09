import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { timeStamp } from "console";
import { Model } from "mongoose";
import { IMessageRepository } from "src/interface/IMessageRepository";
import { Message } from "src/model/message.schema";

@Injectable()
export class MessageRepository implements IMessageRepository {
    constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) { }


    async getGroupHistory(groupName: string) {
        try {
            const history = await this.messageModel.find({ groupName: groupName }).sort({ timeStamp: 1 });
            return history;
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async saveMessage(candidateId: string, candidateName: string, groupName: string, message: string) {
        try {
            console.log(candidateId, message, groupName, 'this is servicerepose last')
            const newMessage = new this.messageModel({
                groupName: groupName,
                userId: candidateId,
                userName: candidateName,
                text: message
            });
            return await newMessage.save();
        } catch (error: any) {
            console.log(error.message);
            throw new HttpException(error.message || 'An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}