import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InterviewerModule } from './interviewer/interviewer.module';
import { CandidateModule } from './candidate/candidate.module';
import { AdminModule } from './admin/admin.module';
import { ClientsModule, GrpcOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoURL'),
        dbName: 'Booking',
      }),
    }),

    // 👇 RabbitMQ Microservice Configuration
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'payment_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    InterviewerModule,
    CandidateModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static grpcOptions(): GrpcOptions {
    console.log('Resolved protoPath:', __dirname + './proto/booking.proto');
    return {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50052',
        package: 'booking', // Package name defined in .proto file
        protoPath: join(__dirname, '..', 'src', 'proto', 'booking.proto'),
      },
    };
  }
}
