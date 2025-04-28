import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateModule } from './candidate/candidate.module';
import { InterviewerModule } from './interviewer/interviewer.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoURL'),
        dbName: 'Payment',
      }),
    }),

    CandidateModule,

    InterviewerModule,

    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
