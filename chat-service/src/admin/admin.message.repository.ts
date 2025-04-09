import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAdminMessageRepository } from "src/interface/admin/IAdminMessageRepository";
import { Group } from "src/model/group.schema";
import { Message } from "src/model/message.schema";

@Injectable()
export class AdminMessageRepository implements IAdminMessageRepository {
    constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) { }


}