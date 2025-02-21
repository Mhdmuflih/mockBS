import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CandidateModule } from "src/candidate/candidate.module";
import { Scheduled, ScheduledSchema } from "src/candidate/model/scheduled.schema";
import { InterviewerModule } from "src/interviewer/interviewer.module";
import { AdminController } from "./controller/admin.controller";
import { AdminService } from "./service/admin.service";
import { AdminRepository } from "./repository/admin.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Scheduled.name, schema: ScheduledSchema }]),
        InterviewerModule,
        CandidateModule
    ],
    controllers:[AdminController],
    providers:[AdminService, AdminRepository]
})

export class AdminModule { }