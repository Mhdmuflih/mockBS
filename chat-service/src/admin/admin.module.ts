import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Group, GroupSchema } from "src/model/group.schema";
import { Message, MessageSchema } from "src/model/message.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminGroupRepository } from "./admin.repository";
import { AdminMessageRepository } from "./admin.message.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ],
    controllers:[AdminController],
    providers:[AdminService, AdminGroupRepository, AdminMessageRepository]
})

export class AdminModule { }