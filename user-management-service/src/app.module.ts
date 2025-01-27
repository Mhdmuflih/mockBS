import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InterviewerModule } from './interviewer/interviewer.module';
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidate/candidate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from './Config/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    ConfigModule.forRoot(),
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
  providers: [CloudinaryService],
})
export class AppModule { }
