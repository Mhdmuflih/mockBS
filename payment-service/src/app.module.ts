import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateModule } from './candidate/candidate.module';
import { ClientsModule, GrpcOptions, Transport } from '@nestjs/microservices';
import { url } from 'inspector';
import { join } from 'path';
import { InterviewerModule } from './interviewer/interviewer.module';


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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
