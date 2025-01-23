import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InterviewerModule } from './interviewer/interviewer.module';
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidate/candidate.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoURL'),
        dbName: 'Auth',
      }),
    }),    
    CandidateModule,
    InterviewerModule,
    AdminModule,
  ],
})
export class AppModule { }
