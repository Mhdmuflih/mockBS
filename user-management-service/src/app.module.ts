import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InterviewerModule } from './interviewer/interviewer.module';
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidate/candidate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from './Config/cloudinary.service';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
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
export class AppModule {
  static grpcOptions(): GrpcOptions {
    console.log('Resolved protoPath:', join(__dirname, '..', 'src', 'proto', 'premium.proto'));

    return {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        protoPath: [
          join(__dirname, '..', 'src', 'proto', 'interviewer.proto'), 
          join(__dirname, '..', 'src', 'proto', 'premium.proto')
        ],
        package: ['interviewer', 'premium'], 
      },
    };
  }
}
