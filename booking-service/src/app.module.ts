import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewerModule } from './interviewer/interviewer.module';
import { CandidateModule } from './candidate/candidate.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoURL'),
        dbName: 'Booking',
      }),
    }),
    InterviewerModule,
    CandidateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
